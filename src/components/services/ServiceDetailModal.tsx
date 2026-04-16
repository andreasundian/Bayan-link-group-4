import React from 'react';
import { 
  X, 
  Building, 
  Clock, 
  DollarSign, 
  FileText, 
  CheckCircle2,
  AlertCircle,
  Wrench
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Service {
  id: string;
  name: string;
  description: string;
  department: string;
  requirements: string;
  fee: number;
  processingTime: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
}

interface ServiceDetailModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceDetailModal({ service, isOpen, onClose }: ServiceDetailModalProps) {
  if (!service) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle2 className="text-emerald-500" size={20} />;
      case 'Maintenance': return <Wrench className="text-amber-500" size={20} />;
      default: return <AlertCircle className="text-slate-400" size={20} />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{service.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2 py-0.5 rounded-full border ${
                      service.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      service.status === 'Maintenance' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      'bg-slate-50 text-slate-700 border-slate-100'
                    }`}>
                      {getStatusIcon(service.status)}
                      {service.status}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Building size={12} /> {service.department}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
              {/* Description */}
              <section>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  Service Description
                </h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {service.description}
                </p>
              </section>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 mb-1 text-slate-500">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Processing Time</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 ml-7">{service.processingTime}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3 mb-1 text-slate-500">
                    <DollarSign size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Service Fee</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 ml-7">
                    {service.fee === 0 ? 'Free of Charge' : `₱${service.fee.toLocaleString()}`}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <section>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className="w-1 h-4 bg-primary rounded-full"></div>
                  Requirements
                </h4>
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5">
                  <ul className="space-y-3">
                    {service.requirements.split('\n').map((req, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-primary/20">
                Apply for Service
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
