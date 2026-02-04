import axios from 'axios';

// Detect if we are in production (Netlify) or local
// If local, use localhost:3000
// If production, use relative path /api which redirects to /.netlify/functions/api

const isProduction = import.meta.env.PROD;
const baseURL = isProduction ? '/api' : 'http://localhost:3000/api';

const api = axios.create({
    baseURL: baseURL,
});

export const fetchArticles = async (company, category) => {
    const params = {};
    if (company) params.company = company;
    if (category && category !== 'All') params.category = category;

    const response = await api.get('/articles', { params });
    return response.data;
};

export const fetchStatistics = async (company) => {
    const params = {};
    if (company) params.company = company;

    const response = await api.get('/statistics', { params });
    return response.data;
};

export const fetchCompanies = async () => {
    const response = await api.get('/companies');
    return response.data;
};

export const analyzeText = async (text) => {
    const response = await api.post('/analyze', { text });
    return response.data;
};

export default api;
