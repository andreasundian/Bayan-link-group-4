import React from 'react';
import { X, Building2, MapPin, Users, Globe, Phone, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Municipality {
  id: string;
  name: string;
  address: string;
  population: number;
  website: string;
  contactNumber: string;
  mayor: string;
}

interface MunicipalityDetailModalProps {
  municipality: Municipality | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MunicipalityDetailModal({ municipality, isOpen, onClose }: MunicipalityDetailModalProps) {
  if (!municipality) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{municipality.name}</h3>
                  <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {municipality.address}
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 mb-1 text-slate-500">
                    <User size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Current Mayor</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 ml-7">{municipality.mayor}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 mb-1 text-slate-500">
                    <Users size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Population</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 ml-7">{municipality.population?.toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 mb-1 text-slate-500">
                    <Phone size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Contact Number</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 ml-7">{municipality.contactNumber}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 mb-1 text-slate-500">
                    <Globe size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Official Website</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 ml-7">{municipality.website}</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
              <button onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
