
import React, { useState } from 'react';
import { Rocket, Brain, Loader2, Target, BarChart3, AlertCircle } from 'lucide-react';
import { gemini } from '../services/geminiService';

export const StrategyBot: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const result = await gemini.analyzeStrategy(prompt);
      setAnalysis(result || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-indigo-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-indigo-500 p-3 rounded-2xl">
              <Brain size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Strategy Lab</h2>
              <p className="text-indigo-200">Deep reasoning & long-term growth forecasting.</p>
            </div>
          </div>

          <div className="space-y-4">
            <textarea 
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: I want to launch a SaaS for pet grooming businesses. Analyze the market entry strategy and 12-month roadmap."
              className="w-full p-4 bg-indigo-950/50 border border-indigo-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none placeholder-indigo-400 text-indigo-50 transition-all resize-none"
            />
            <button 
              onClick={handleAnalyze}
              disabled={loading}
              className="px-8 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Analyzing with Thinking Budget...
                </>
              ) : (
                <>
                  <Rocket size={20} />
                  Initiate Strategic Analysis
                </>
              )}
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>

      {loading && (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 flex flex-col items-center justify-center text-center animate-pulse">
          <Brain size={48} className="text-indigo-600 mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Simulating Scenarios</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            The AI is currently allocating thinking tokens to model complex market variables and competitor responses. This may take 10-20 seconds.
          </p>
        </div>
      )}

      {analysis && !loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slideUp">
          <div className="md:col-span-2 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm prose prose-indigo max-w-none">
            <div className="flex items-center gap-2 mb-6 text-indigo-600 font-bold uppercase tracking-widest text-xs">
              <Target size={16} /> Strategy Document
            </div>
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
              {analysis}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 size={18} className="text-indigo-600" /> Key Takeaways
              </h4>
              <ul className="space-y-3">
                {[
                  "Focus on niche differentiation",
                  "Prioritize high-LTV segments",
                  "Modularize initial MVP",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100 shadow-sm">
              <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                <AlertCircle size={18} /> Risk Warning
              </h4>
              <p className="text-xs text-orange-700 leading-relaxed">
                Strategy forecasts depend on current market volatility. Re-run analysis monthly to adjust for external shifts.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
