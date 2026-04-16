import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Newspaper, 
  Users, 
  Briefcase, 
  FileText, 
  Calendar, 
  AlertCircle, 
  ShieldAlert,
  Settings,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

const menuItems = [
  { group: 'Core Modules', items: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Building2, label: 'Municipality', path: '/municipality' },
    { icon: Newspaper, label: 'News Feed', path: '/news' },
  ]},
  { group: 'System', items: [
    { icon: Users, label: 'Users', path: '/users', status: 'Roadmap' },
    { icon: Settings, label: 'Settings', path: '/settings', status: 'Roadmap' },
  ]},
  { group: 'Future Modules', items: [
    { icon: Briefcase, label: 'Services', path: '/services', status: 'Roadmap' },
    { icon: FileText, label: 'Requests', path: '/requests', status: 'Roadmap' },
    { icon: Calendar, label: 'Appointments', path: '/appointments', status: 'Roadmap' },
    { icon: AlertCircle, label: 'Complaints', path: '/complaints', status: 'Roadmap' },
    { icon: ShieldAlert, label: 'SOS Reports', path: '/sos', status: 'Roadmap' },
  ]}
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-[240px] bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-extrabold text-white text-lg">
          B
        </div>
        <h1 className="text-xl font-extrabold text-primary tracking-tight">BayanLink</h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {menuItems.map((group) => (
          <div key={group.group}>
            <h2 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              {group.group}
            </h2>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                const isRoadmap = item.status === 'Roadmap';

                return (
                  <Link
                    key={item.path}
                    to={isRoadmap ? '#' : item.path}
                    className={`
                      flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group
                      ${isActive 
                        ? 'bg-blue-50 text-primary font-semibold' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                      ${isRoadmap ? 'cursor-not-allowed opacity-50' : ''}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div layoutId="active-indicator" className="w-1 h-4 bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2 text-slate-500 text-xs">
          <div className="w-2 h-2 rounded-full bg-success"></div>
          System Healthy
        </div>
      </div>
    </div>
  );
}
