
import React, { useState } from 'react';
import { Palette, ImageIcon, Loader2, Download, Copy, CheckCircle } from 'lucide-react';
import { gemini } from '../services/geminiService';

export const ContentGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const url = await gemini.generateMarketingVisual(prompt);
      setImageUrl(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-500 p-3 rounded-2xl text-white">
              <Palette size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Ad Creative Studio</h2>
              <p className="text-slate-500">Generate high-conversion visuals for your business.</p>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Product/Brand Description</label>
              <textarea 
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: A minimalist luxury wristwatch on a marble surface with warm sunset lighting..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all resize-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-lg transition-all shadow-lg shadow-purple-200 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Painting Creative...
                </>
              ) : (
                <>
                  <ImageIcon />
                  Generate Ad Visual
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-[400px]">
          {imageUrl ? (
            <div className="relative group rounded-3xl overflow-hidden border-8 border-white shadow-2xl animate-scaleIn">
              <img src={imageUrl} alt="Generated asset" className="w-full h-auto" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <a 
                  href={imageUrl} 
                  download="marketing-asset.png"
                  className="p-4 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform"
                >
                  <Download size={24} />
                </a>
                <button 
                  onClick={copyToClipboard}
                  className="p-4 bg-white rounded-full text-slate-900 hover:scale-110 transition-transform"
                >
                  {copied ? <CheckCircle className="text-green-500" size={24} /> : <Copy size={24} />}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-100 rounded-3xl border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 p-12 text-center">
              <ImageIcon size={64} strokeWidth={1} className="mb-4" />
              <p className="font-medium">Your generated visual will appear here</p>
              <p className="text-sm mt-2">Describe your vision on the left to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
