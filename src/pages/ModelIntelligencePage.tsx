import React, { useState } from 'react';
import type { ModelPerformanceMetrics } from '../types';
import { Cpu, RefreshCw, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ModelIntelligencePageProps {
  metrics: ModelPerformanceMetrics;
}

export const ModelIntelligencePage: React.FC<ModelIntelligencePageProps> = ({ metrics: initialMetrics }) => {
  const [currentMetrics, setCurrentMetrics] = useState<ModelPerformanceMetrics>(initialMetrics);
  const [isRetraining, setIsRetraining] = useState(false);
  const [retrainProgress, setRetrainProgress] = useState(0);
  const [retrainPhase, setRetrainPhase] = useState('');
  const [retrainCompleted, setRetrainCompleted] = useState(false);
  const [retrainCount, setRetrainCount] = useState(0);
  const [lastRetrainSummary, setLastRetrainSummary] = useState('');
  const [isUpdatingMetrics, setIsUpdatingMetrics] = useState(false);

  const triggerMetricPulse = () => {
    setIsUpdatingMetrics(true);
    setTimeout(() => setIsUpdatingMetrics(false), 400);
  };

  const handleTriggerRetrain = () => {
    setIsRetraining(true);
    setRetrainProgress(10);
    setRetrainPhase('Phase 1/3 (Ingestion): Ingesting 38,400 streaming land parcels & feature matrices...');
    setRetrainCompleted(false);

    let progress = 10;
    const interval = setInterval(() => {
      progress += 15;
      setRetrainProgress(progress);

      // Intermediate Update #1 at 40% progress
      if (progress === 40) {
        setRetrainPhase('Phase 2/3 (Hyperparameter Tuning): Optimizing XGBoost tree depth & gradient loss...');
        triggerMetricPulse();
        setCurrentMetrics((prev) => ({
          ...prev,
          accuracy: Math.min(0.978, Math.round((prev.accuracy + 0.003) * 1000) / 1000),
          precision: Math.min(0.965, Math.round((prev.precision + 0.004) * 1000) / 1000),
          trainingRecordsCount: prev.trainingRecordsCount + 12800,
          confidenceIndex: Math.min(98.8, Math.round((prev.confidenceIndex + 0.4) * 10) / 10),
        }));
      }

      // Intermediate Update #2 at 70% progress
      if (progress === 70) {
        setRetrainPhase('Phase 3/3 (Validation): Running 10-fold cross-validation & Cox survival regression...');
        triggerMetricPulse();
        setCurrentMetrics((prev) => ({
          ...prev,
          accuracy: Math.min(0.978, Math.round((prev.accuracy + 0.003) * 1000) / 1000),
          recall: Math.min(0.981, Math.round((prev.recall + 0.004) * 1000) / 1000),
          f1Score: Math.min(0.972, Math.round((prev.f1Score + 0.005) * 1000) / 1000),
          trainingRecordsCount: prev.trainingRecordsCount + 12800,
          modelDrift: Math.max(0.002, Math.round((prev.modelDrift - 0.001) * 1000) / 1000),
        }));
      }

      // Final Update #3 at 100% completion
      if (progress >= 100) {
        clearInterval(interval);
        setIsRetraining(false);
        setRetrainCompleted(true);
        triggerMetricPulse();

        setRetrainCount((count) => {
          const nextCount = count + 1;
          const newVersion = `Predictive Engine v4.${2 + nextCount}-Prod`;
          const finalAccuracy = Math.min(0.978, Math.round((currentMetrics.accuracy + 0.008) * 1000) / 1000);
          const finalPrecision = Math.min(0.965, Math.round((currentMetrics.precision + 0.011) * 1000) / 1000);
          const finalRecall = Math.min(0.981, Math.round((currentMetrics.recall + 0.007) * 1000) / 1000);
          const finalF1 = Math.min(0.972, Math.round((currentMetrics.f1Score + 0.009) * 1000) / 1000);
          const finalRoc = Math.min(0.992, Math.round((currentMetrics.rocAuc + 0.008) * 1000) / 1000);
          const finalConfidence = Math.min(98.8, Math.round((currentMetrics.confidenceIndex + 1.2) * 10) / 10);
          const finalDrift = Math.max(0.002, Math.round((currentMetrics.modelDrift - 0.003) * 1000) / 1000);
          const nowStr = `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })} IST (Live Execution)`;
          const finalRecords = currentMetrics.trainingRecordsCount + 12800; // completes full +38,400 total

          const accDiff = ((finalAccuracy - currentMetrics.accuracy) * 100).toFixed(1);
          const f1Diff = ((finalF1 - currentMetrics.f1Score) * 100).toFixed(1);

          setCurrentMetrics({
            version: newVersion,
            status: 'ACTIVE',
            lastTrainedDate: nowStr,
            trainingRecordsCount: finalRecords,
            accuracy: finalAccuracy,
            precision: finalPrecision,
            recall: finalRecall,
            f1Score: finalF1,
            rocAuc: finalRoc,
            confidenceIndex: finalConfidence,
            algorithm: 'XGBoost + Cox Survival (Retrained)',
            modelDrift: finalDrift,
            featuresUsed: 48 + nextCount,
          });

          setLastRetrainSummary(
            `${newVersion} published with ${finalRecords.toLocaleString()} records (+38,400 new data points). Accuracy improved to ${(finalAccuracy * 100).toFixed(1)}% (+${accDiff}%), F1 score reached ${(finalF1 * 100).toFixed(1)}% (+${f1Diff}%), Model Drift reduced to ${finalDrift}.`
          );

          return nextCount;
        });
      }
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 tracking-tight">
            <Cpu className="w-6 h-6 text-blue-600" />
            AI Model Intelligence
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Model performance metrics, drift tracking, and automated retraining status.
          </p>
        </div>

        <button
          onClick={handleTriggerRetrain}
          disabled={isRetraining}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition shadow-md shadow-blue-600/30 flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isRetraining ? 'animate-spin' : ''}`} />
          <span>{isRetraining ? 'Retraining Model...' : 'Trigger Model Retraining'}</span>
        </button>
      </div>

      {retrainCompleted && (
        <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-900 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <span className="font-bold">Model Retraining Completed Successfully (Cycle #{retrainCount})</span>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              {lastRetrainSummary}
            </p>
          </div>
        </div>
      )}

      {isRetraining && (
        <div className="clean-card p-5 border border-blue-200 space-y-2 text-xs">
          <div className="flex justify-between font-semibold text-slate-800">
            <span className="animate-pulse text-blue-700">{retrainPhase}</span>
            <span className="text-blue-600 font-bold">{retrainProgress}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full transition-all duration-300 rounded-full" style={{ width: `${retrainProgress}%` }} />
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className={`clean-card p-5 text-center transition-all duration-300 ${isUpdatingMetrics ? 'scale-105 border-blue-400 bg-blue-50/40' : ''}`}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accuracy</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{(currentMetrics.accuracy * 100).toFixed(1)}%</div>
          <span className="text-[10px] text-emerald-600 font-bold">Top Quartile</span>
        </div>

        <div className={`clean-card p-5 text-center transition-all duration-300 ${isUpdatingMetrics ? 'scale-105 border-blue-400 bg-blue-50/40' : ''}`}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Precision</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{(currentMetrics.precision * 100).toFixed(1)}%</div>
          <span className="text-[10px] text-slate-500 font-medium">Delay Detection</span>
        </div>

        <div className={`clean-card p-5 text-center transition-all duration-300 ${isUpdatingMetrics ? 'scale-105 border-blue-400 bg-blue-50/40' : ''}`}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Recall</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{(currentMetrics.recall * 100).toFixed(1)}%</div>
          <span className="text-[10px] text-slate-500 font-medium">True Delay Capture</span>
        </div>

        <div className={`clean-card p-5 text-center transition-all duration-300 ${isUpdatingMetrics ? 'scale-105 border-blue-400 bg-blue-50/40' : ''}`}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">F1 Score</span>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{(currentMetrics.f1Score * 100).toFixed(1)}%</div>
          <span className="text-[10px] text-emerald-600 font-bold">Balanced Metric</span>
        </div>

        <div className={`clean-card p-5 text-center col-span-2 sm:col-span-1 transition-all duration-300 ${isUpdatingMetrics ? 'scale-105 border-blue-400 bg-blue-50/40' : ''}`}>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ROC-AUC</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-1">{currentMetrics.rocAuc.toFixed(3)}</div>
          <span className="text-[10px] text-blue-600 font-bold">High Discrimination</span>
        </div>
      </div>

      <div className="clean-card p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          Active Model Metadata
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-2.5">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Model Version:</span>
              <span className="font-bold text-slate-900">{currentMetrics.version}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Status:</span>
              <span className="font-bold text-emerald-600">{currentMetrics.status}</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Last Trained:</span>
              <span className="font-bold text-slate-800">{currentMetrics.lastTrainedDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Training Records:</span>
              <span className="font-bold text-slate-800">{currentMetrics.trainingRecordsCount.toLocaleString()}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 space-y-2.5">
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Features Evaluated:</span>
              <span className="font-bold text-slate-900">{currentMetrics.featuresUsed} Parameters</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Confidence Index:</span>
              <span className="font-bold text-emerald-600">{currentMetrics.confidenceIndex}%</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-1.5">
              <span className="text-slate-500">Model Drift (PSI):</span>
              <span className="font-bold text-slate-800">{currentMetrics.modelDrift} (Low)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Core Algorithm:</span>
              <span className="font-bold text-blue-600 truncate">{currentMetrics.algorithm}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
