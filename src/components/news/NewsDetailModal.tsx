import React from 'react';
import { X, Newspaper, Calendar, User, Tag, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NewsFeed {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishDate: string;
  status: 'Draft' | 'Published' | 'Archived';
}

interface NewsDetailModalProps {
  news: NewsFeed | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsDetailModal({ news, isOpen, onClose }: NewsDetailModalProps) {
  if (!news) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Newspaper size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{news.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      <Tag size={10} /> {news.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <Calendar size={12} /> {news.publishDate}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
              <div className="flex items-center gap-4 text-sm text-slate-600 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                    {news.author.charAt(0)}
                  </div>
                  <span className="font-semibold">{news.author}</span>
                </div>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>Status: <span className="font-semibold">{news.status}</span></span>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {news.content}
                </p>
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
