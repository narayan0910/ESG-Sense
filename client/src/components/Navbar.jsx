import React from 'react';
import { LayoutDashboard, Newspaper, ShieldCheck } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2">
                            <ShieldCheck className="h-8 w-8 text-emerald-600" />
                            <span className="font-bold text-xl text-slate-800">ESG<span className="text-emerald-600">Sense</span></span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <button
                                onClick={() => setActiveTab('dashboard')}
                                className={`${activeTab === 'dashboard'
                                        ? 'border-emerald-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab('news')}
                                className={`${activeTab === 'news'
                                        ? 'border-emerald-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                <Newspaper className="w-4 h-4 mr-2" />
                                News Feed
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
