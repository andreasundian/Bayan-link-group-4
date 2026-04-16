import React from 'react';
import { 
  Building2, 
  Newspaper, 
  Clock, 
  CheckCircle2, 
  Plus,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';

const stats = [
  { label: 'Total Municipalities', value: '42', icon: Building2 },
  { label: 'Active News Feeds', value: '158', icon: Newspaper },
  { label: 'Pending Requests', value: '12', icon: Clock },
  { label: 'System Status', value: 'HEALTHY', icon: CheckCircle2, isStatus: true },
];

const municipalities = [
  { name: 'Aliaga', region: 'Region III', status: 'Active', updated: '2 hours ago' },
  { name: 'Cabanatuan City', region: 'Region III', status: 'Active', updated: '5 hours ago' },
  { name: 'Baler', region: 'Region III', status: 'Active', updated: '1 day ago' },
];

const roadmap = [
  { title: 'Municipality & News', desc: 'Implemented Core BREAD', active: true },
  { title: 'Auth & User Management', desc: 'Completed Security Layer', active: true },
  { title: 'Service Requests', desc: 'Next Sprint: Documents & SOS', active: false },
  { title: 'Analytics & Reports', desc: 'Planned: Data Visualizations', active: false },
];

export default function Dashboard() {
  return (
    <div className="flex gap-8 h-full">
      <div className="flex-1 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"
            >
              <p className="text-[12px] font-medium text-slate-500 mb-2 uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-bold ${stat.isStatus ? 'text-success' : 'text-slate-900'}`}>
                  {stat.value}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BREAD Table Area */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 px-6 border-b border-slate-200 flex justify-between items-center bg-white">
            <h3 className="text-base font-bold text-slate-900">Recent Municipalities</h3>
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
              <Plus size={16} /> Add Municipality
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {municipalities.map((m) => (
                  <tr key={m.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">{m.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{m.region}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wide border border-emerald-100">
                        {m.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{m.updated}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-md transition-all">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Roadmap Sidebar */}
      <div className="w-[280px] shrink-0 space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
          <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-widest mb-6">Module Roadmap</h3>
          <div className="space-y-6">
            {roadmap.map((item, i) => (
              <div key={item.title} className="flex gap-4 relative">
                {i !== roadmap.length - 1 && (
                  <div className="absolute left-[3.5px] top-4 bottom-[-24px] w-[1px] bg-slate-100"></div>
                )}
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 z-10 ${
                  item.active ? 'bg-primary ring-4 ring-blue-50' : 'bg-slate-200'
                }`}></div>
                <div className="space-y-1">
                  <h4 className="text-[13px] font-bold text-slate-900 leading-none">{item.title}</h4>
                  <p className="text-[12px] text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
            <p className="text-[11px] leading-relaxed text-slate-500">
              <strong>Developer Note:</strong> This template uses Tailwind + Bootstrap integration for rapid BREAD development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
