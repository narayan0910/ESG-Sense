import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { fetchStatistics, fetchCompanies } from '../services/api';
import { Loader2 } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        loadCompanies();
    }, []);

    useEffect(() => {
        loadStats();
    }, [selectedCompany]);

    const loadCompanies = async () => {
        try {
            const data = await fetchCompanies();
            setCompanies(data);
        } catch (error) {
            console.error('Failed to load companies', error);
        }
    };

    const loadStats = async () => {
        setLoading(true);
        try {
            const data = await fetchStatistics(selectedCompany);
            setStats(data);
        } catch (error) {
            console.error('Failed to load stats', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && !stats) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-emerald-600 w-8 h-8" /></div>;

    // Process data for charts
    const categoryChartData = {
        labels: stats?.category.map(item => item.category) || [],
        datasets: [
            {
                data: stats?.category.map(item => item.count) || [],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.2)', // Emerald (E)
                    'rgba(59, 130, 246, 0.2)', // Blue (S)
                    'rgba(139, 92, 246, 0.2)', // Purple (G)
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(139, 92, 246, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const sentimentChartData = {
        labels: stats?.sentiment.map(item => item.sentiment_label) || [],
        datasets: [
            {
                data: stats?.sentiment.map(item => item.count) || [],
                backgroundColor: [
                    'rgba(239, 68, 68, 0.2)', // Red
                    'rgba(107, 114, 128, 0.2)', // Grey
                    'rgba(16, 185, 129, 0.2)', // Emerald
                ],
                borderColor: [
                    'rgba(239, 68, 68, 1)',
                    'rgba(107, 114, 128, 1)',
                    'rgba(16, 185, 129, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const trendChartData = {
        labels: stats?.trend.map(item => new Date(item.date).toLocaleDateString()) || [],
        datasets: [
            {
                label: 'Avg Sentiment Score',
                data: stats?.trend.map(item => item.avg_sentiment) || [],
                borderColor: 'rgb(59, 130, 246)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                tension: 0.3
            }
        ]
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">ESG Analytics Overview</h2>
                <select
                    className="border border-gray-300 rounded-lg text-sm px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                >
                    <option value="">All Companies</option>
                    {companies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">News by Category (E/S/G)</h3>
                    <div className="h-64 flex justify-center">
                        {stats?.category.length > 0 ? <Doughnut data={categoryChartData} options={{ maintainAspectRatio: false }} /> : <p className="self-center text-gray-400">No data available</p>}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Sentiment Distribution</h3>
                    <div className="h-64 flex justify-center">
                        {stats?.sentiment.length > 0 ? <Doughnut data={sentimentChartData} options={{ maintainAspectRatio: false }} /> : <p className="self-center text-gray-400">No data available</p>}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                    <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Sentiment Trend Over Time</h3>
                    <div className="h-72">
                        {stats?.trend.length > 0 ? <Line data={trendChartData} options={{ maintainAspectRatio: false, scales: { y: { min: -1, max: 1 } } }} /> : <p className="flex justify-center items-center h-full text-gray-400">No trend data available</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
