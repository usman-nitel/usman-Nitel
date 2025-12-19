
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { MarketResearch } from './components/MarketResearch';
import { ContentGenerator } from './components/ContentGenerator';
import { StrategyBot } from './components/StrategyBot';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onViewChange={setCurrentView} />;
      case AppView.MARKET_RESEARCH:
        return <MarketResearch />;
      case AppView.CONTENT_GEN:
        return <ContentGenerator />;
      case AppView.STRATEGY:
        return <StrategyBot />;
      default:
        return <Dashboard onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activeView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;
