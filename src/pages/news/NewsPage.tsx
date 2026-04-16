import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit2, 
  Trash2, 
  Eye,
  Calendar,
  User,
  Tag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '../../services/api';
import DeleteConfirmModal from '../../components/common/DeleteConfirmModal';
import AddNewsModal from '../../components/news/AddNewsModal';
import EditNewsModal from '../../components/news/EditNewsModal';
import NewsDetailModal from '../../components/news/NewsDetailModal';

interface NewsFeed {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  publishDate: string;
  status: 'Draft' | 'Published' | 'Archived';
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal States
  const [selectedNews, setSelectedNews] = useState<NewsFeed | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchNews = async () => {
    try {
      const response = await api.newsFeeds.browse();
      if (response.success) {
        setNews(response.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (item: NewsFeed) => {
    setSelectedNews(item);
    setIsDetailModalOpen(true);
  };

  const handleOpenEdit = (item: NewsFeed) => {
    setSelectedNews(item);
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (item: NewsFeed) => {
    setSelectedNews(item);
    setIsDeleteModalOpen(true);
  };

  const handleAdd = async (data: any) => {
    try {
      const response = await api.newsFeeds.add(data);
      if (response.success) {
        await fetchNews();
      }
    } catch (error) {
      console.error('Error adding news:', error);
      throw error;
    }
  };

  const handleEdit = async (id: string, data: any) => {
    try {
      const response = await api.newsFeeds.edit(id, data);
      if (response.success) {
        await fetchNews();
      }
    } catch (error) {
      console.error('Error editing news:', error);
      throw error;
    }
  };

  const handleDelete = async () => {
    if (!selectedNews) return;
    try {
      const response = await api.newsFeeds.delete(selectedNews.id);
      if (response.success) {
        await fetchNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const filtered = news.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Mayor's News Feed</h2>
          <p className="text-slate-500 text-sm">Manage announcements and news updates.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} /> Create Announcement
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search news by title or author..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                      <p className="text-sm">Loading news...</p>
                    </div>
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Newspaper size={48} className="text-slate-200" />
                      <p className="text-sm">No news items found.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((item, i) => (
                  <motion.tr 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 line-clamp-1">{item.title}</span>
                        <span className="text-[11px] text-slate-500 line-clamp-1">{item.content}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        <Tag size={10} /> {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        {item.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        {item.publishDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase tracking-wide border ${
                        item.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        item.status === 'Draft' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-50 text-slate-700 border-slate-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleViewDetails(item)}
                          className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-md transition-all"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleOpenDelete(item)}
                          className="p-1.5 text-slate-400 hover:text-danger hover:bg-red-50 rounded-md transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <button className="p-1.5 text-slate-400 group-hover:hidden">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length > 0 && (
          <div className="px-6 py-4 border-t border-slate-100 bg-white flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Showing <span className="font-bold text-slate-900">{startIndex + 1}</span> to <span className="font-bold text-slate-900">{Math.min(startIndex + itemsPerPage, filtered.length)}</span> of <span className="font-bold text-slate-900">{filtered.length}</span>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-xs font-bold rounded-lg transition-all ${
                      currentPage === page ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      <AddNewsModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAdd}
      />

      <EditNewsModal 
        news={selectedNews}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEdit}
      />

      <NewsDetailModal 
        news={selectedNews}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Announcement"
        message={`Are you sure you want to delete "${selectedNews?.title}"?`}
      />
    </div>
  );
}
