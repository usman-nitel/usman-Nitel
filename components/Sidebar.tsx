
import React from 'react';
import { LayoutDashboard, Search, Palette, Rocket, HelpCircle } from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Overview', icon: LayoutDashboard },
    { id: AppView.MARKET_RESEARCH, label: 'Market Insights', icon: Search },
    { id: AppView.CONTENT_GEN, label: 'Content Creator', icon: Palette },
    { id: AppView.STRATEGY, label: 'Strategy Lab', icon: Rocket },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 bg-white border-r border-slate-200 lg:block z-50">
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 py-8">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Rocket className="text-white w-6 h-6" />
          </div>
          <span className="ml-3 text-xl font-bold text-slate-900">BizMinds AI</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                activeView === item.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${activeView === item.id ? 'text-indigo-600' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="p-4 bg-indigo-600 rounded-xl text-white">
            <HelpCircle className="w-6 h-6 mb-2" />
            <h4 className="font-semibold text-sm mb-1">Need help?</h4>
            <p className="text-xs text-indigo-100 mb-3">Learn how to maximize your AI agent performance.</p>
            <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-xs font-semibold transition-colors">
              Read Docs
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
