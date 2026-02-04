import React, { useEffect, useState } from 'react';
import { fetchArticles, fetchCompanies } from '../services/api';
import NewsCard from '../components/NewsCard';
import { Search, Loader2 } from 'lucide-react';

const NewsFeed = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterCompany, setFilterCompany] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadCompanies();
    }, []);

    useEffect(() => {
        loadArticles();
    }, [filterCompany, filterCategory]);

    const loadCompanies = async () => {
        try {
            const data = await fetchCompanies();
            setCompanies(data);
        } catch (error) {
            console.error('Failed to load companies');
        }
    };

    const loadArticles = async () => {
        setLoading(true);
        try {
            const data = await fetchArticles(filterCompany, filterCategory);
            setArticles(data);
        } catch (error) {
            console.error('Failed to load articles');
        } finally {
            setLoading(false);
        }
    };

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setFilterCategory('All')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterCategory === 'All' ? 'bg-slate-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        All Categories
                    </button>
                    {['Environmental', 'Social', 'Governance'].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilterCategory(cat)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterCategory === cat ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search news..."
                            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                    >
                        <option value="">All Companies</option>
                        {companies.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="animate-spin text-emerald-600 w-8 h-8" />
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredArticles.map(article => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>
                    {filteredArticles.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            No news articles found matching your criteria.
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default NewsFeed;
