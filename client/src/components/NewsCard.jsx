import React from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

const NewsCard = ({ article }) => {
    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'Positive': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Negative': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Environmental': return 'text-green-600 bg-green-50 border-green-200';
            case 'Social': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'Governance': return 'text-purple-600 bg-purple-50 border-purple-200';
            default: return 'text-gray-600';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={article.image_url || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80'}
                    alt={article.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSentimentColor(article.sentiment_label)}`}>
                        {article.sentiment_label}
                    </span>
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getCategoryColor(article.category)}`}>
                        {article.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Tag size={12} /> {article.company}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {article.description}
                </p>

                <div className="mt-auto flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(article.published_at).toLocaleDateString()}
                    </div>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-emerald-600 font-medium hover:text-emerald-700 hover:underline"
                    >
                        Read Source <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
