
import React, { useState, useRef, useEffect } from 'react';
import { Search, Loader2, ExternalLink, Globe } from 'lucide-react';
import { gemini } from '../services/geminiService';
import { GroundingSource } from '../types';

export const MarketResearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{text: string, sources: GroundingSource[]} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const data = await gemini.performMarketResearch(query);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-orange-500 p-3 rounded-2xl text-white">
            <Globe size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Market Intelligence</h2>
            <p className="text-slate-500">Real-time web-grounded research powered by Google Search.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for competitors, pricing trends, or industry reports..."
            className="w-full pl-14 pr-32 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <button 
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Research'}
          </button>
        </form>
      </div>

      {result && (
        <div ref={scrollRef} className="space-y-6 animate-slideUp">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
              {result.text}
            </div>
          </div>

          {result.sources.length > 0 && (
            <div className="bg-slate-900 p-8 rounded-3xl text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Globe size={20} className="text-indigo-400" />
                Verified Sources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.sources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:bg-slate-700 transition-colors group"
                  >
                    <ExternalLink size={16} className="text-slate-500 mt-1 shrink-0" />
                    <div>
                      <p className="text-sm font-medium line-clamp-2 text-slate-200 group-hover:text-indigo-300">{source.title}</p>
                      <p className="text-xs text-slate-500 mt-1 truncate">{new URL(source.uri).hostname}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
