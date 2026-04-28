import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { ShieldCheck, Activity, Database, TrendingUp, RefreshCcw, ExternalLink, Zap, ShieldAlert, AlertTriangle, Lock, Eye } from 'lucide-react';

const attackTrend = [
  { name: 'Jan', blocked: 1.2 },
  { name: 'Feb', blocked: 4.5 },
  { name: 'Mar', blocked: 2.8 },
  { name: 'Apr', blocked: 8.4 },
  { name: 'May', blocked: 12.0 },
];

const protectionByApp = [
  { name: 'Finance', score: 98 },
  { name: 'Marketing', score: 75 },
  { name: 'Sales', score: 92 },
  { name: 'Ops', score: 84 },
];

const COLORS = ['#f43f5e', '#10b981', '#f59e0b', '#3b82f6'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Protection Executive</h1>
          <p className="text-slate-400 mt-3 text-xl max-w-2xl font-medium">Enterprise global application health, security benchmarks, and multi-cloud protection risk hubs.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-slate-900 border border-slate-800 text-slate-300 px-6 py-3 rounded-2xl font-bold hover:bg-slate-800 transition flex items-center gap-2">
             <RefreshCcw size={18} /> Sync Policy
          </button>
          <button className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-3 rounded-2xl font-bold transition shadow-xl shadow-rose-900/40 flex items-center gap-2">
             <Zap size={18} /> New Baseline
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Posture Index" value="94.2%" change="+2.4%" icon={<ShieldCheck className="text-rose-400" />} />
        <StatCard title="Blocked Req" value="45.2M" change="+1.2M" icon={<ShieldAlert className="text-emerald-400" />} />
        <StatCard title="Mitigation Time" value="14s" change="-2s" icon={<Activity className="text-rose-400" />} />
        <StatCard title="Open Incidents" value="2" change="-1" icon={<AlertTriangle className="text-amber-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Attack Trend */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-rose-600 rounded-full"></span>
              Blocked Attack Volume (Millions)
            </h2>
            <div className="text-[10px] font-black uppercase text-rose-400 tracking-[0.2em] bg-rose-900/20 px-4 py-2 rounded-full border border-rose-800/50">Industrialized Defense</div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attackTrend}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Area type="monotone" dataKey="blocked" stroke="#f43f5e" strokeWidth={4} fillOpacity={1} fill="url(#colorBlocked)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Posture by App */}
        <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
              Security Posture by Application (%)
            </h2>
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold italic">
               <Eye size={20} />
               Compliance Density
            </div>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={protectionByApp}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{ fill: '#1e293b', opacity: 0.4 }}
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px' }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={50}>
                  {protectionByApp.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Incidents Preview */}
      <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-[3rem] backdrop-blur-3xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-10 text-white flex items-center gap-3 text-rose-400 uppercase tracking-widest">
           <AlertTriangle size={28} />
           High-Priority Security Incidents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <ProjectCard name="SQLi Flood" type="L7" status="Mitigated" blocked="452K" color="text-emerald-400" />
           <ProjectCard name="SYN Flood" type="L4" status="Mitigated" blocked="12M" color="text-emerald-400" />
           <ProjectCard name="Bot Scraping" type="BOT" status="Active" blocked="1.2M" color="text-rose-400" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon }: any) => (
  <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-[2.5rem] hover:border-rose-500/30 transition-all group overflow-hidden relative shadow-2xl">
    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-1000 rotate-12">
       {React.cloneElement(icon, { size: 160 })}
    </div>
    <div className="relative z-10">
      <div className="p-4 bg-slate-950 rounded-2xl w-fit mb-6 border border-slate-800/50 shadow-inner group-hover:scale-110 transition duration-500">{icon}</div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-3">
        <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
        <span className={`text-[11px] font-black pb-1.5 ${change.startsWith('+') || change.startsWith('-') || change === 'Optimal' || change.endsWith('%') ? 'text-emerald-400' : 'text-rose-400'}`}>{change}</span>
      </div>
    </div>
  </div>
);

const ProjectCard = ({ name, type, status, blocked, color }: any) => (
  <div className="p-6 bg-slate-950/50 border border-slate-800 rounded-3xl hover:bg-slate-800/50 transition cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-bold text-slate-100">{name}</h3>
      <span className={`text-[10px] font-black px-3 py-1 rounded-full border border-slate-700 uppercase tracking-tighter ${status === 'Mitigated' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800/50' : 'bg-rose-950/20 text-rose-400 border-rose-800/50'}`}>{status}</span>
    </div>
    <div className="flex justify-between items-center mt-8">
       <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest italic">Type: {type} | Blocked: {blocked}</span>
       <ExternalLink size={14} className="text-slate-700 group-hover:text-white transition" />
    </div>
  </div>
);

export default Dashboard;
