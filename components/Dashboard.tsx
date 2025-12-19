
import React from 'react';
import { AppView } from '../types';
import { ArrowRight, Search, Palette, Rocket, TrendingUp, Users, MessageSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardProps {
  onViewChange: (view: AppView) => void;
}

const data = [
  { name: 'Mon', leads: 400, conv: 240 },
  { name: 'Tue', leads: 300, conv: 139 },
  { name: 'Wed', leads: 200, conv: 980 },
  { name: 'Thu', leads: 278, conv: 390 },
  { name: 'Fri', leads: 189, conv: 480 },
  { name: 'Sat', leads: 239, conv: 380 },
  { name: 'Sun', leads: 349, conv: 430 },
];

export const Dashboard: React.FC<DashboardProps> = ({ onViewChange }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">Business Command Center</h1>
        <p className="text-slate-500 mt-2">Welcome back. Your AI agent is ready to assist with today's objectives.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', value: '$45,231', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Active Leads', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'AI Assistance', value: '124 hrs', icon: MessageSquare, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Market Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Line type="monotone" dataKey="leads" stroke="#4f46e5" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Department Conversion</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="conv" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => onViewChange(AppView.MARKET_RESEARCH)}
          className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all text-left"
        >
          <div className="bg-orange-100 text-orange-600 p-3 rounded-xl w-fit mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <Search size={24} />
          </div>
          <h4 className="font-bold text-slate-900">Conduct Research</h4>
          <p className="text-sm text-slate-500 mt-1">Scan live data for competitor pricing and trends.</p>
          <ArrowRight className="absolute bottom-6 right-6 text-slate-300 group-hover:text-indigo-600 transition-colors" size={20} />
        </button>

        <button 
          onClick={() => onViewChange(AppView.CONTENT_GEN)}
          className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all text-left"
        >
          <div className="bg-purple-100 text-purple-600 p-3 rounded-xl w-fit mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Palette size={24} />
          </div>
          <h4 className="font-bold text-slate-900">Generate Ads</h4>
          <p className="text-sm text-slate-500 mt-1">Create marketing copy and pro-grade visuals.</p>
          <ArrowRight className="absolute bottom-6 right-6 text-slate-300 group-hover:text-indigo-600 transition-colors" size={20} />
        </button>

        <button 
          onClick={() => onViewChange(AppView.STRATEGY)}
          className="group relative bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all text-left"
        >
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl w-fit mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Rocket size={24} />
          </div>
          <h4 className="font-bold text-slate-900">Strategic Planning</h4>
          <p className="text-sm text-slate-500 mt-1">Draft a 5-year growth strategy using deep reasoning.</p>
          <ArrowRight className="absolute bottom-6 right-6 text-slate-300 group-hover:text-indigo-600 transition-colors" size={20} />
        </button>
      </div>
    </div>
  );
};
