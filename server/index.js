const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

// --- MOCK DATA STORE (In-Memory for Netlify Function Compatibility) ---
// Since Netlify functions are stateless, this resets on cold starts.
// For a demo/mock-data app, this is perfectly acceptable and reliable.

const MOCK_ARTICLES = [
    // Tesla
    {
        company: 'Tesla',
        title: 'Tesla Breaks Ground on New Lithium Refinery to Boost EV Battery Supply Chain',
        description: 'Tesla has officially started construction on its new lithium refinery in Texas, aiming to secure a sustainable supply of battery materials.',
        content: 'Tesla CEO Elon Musk attended the groundbreaking ceremony...',
        url: 'https://example.com/tesla-lithium',
        image_url: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80',
        published_at: new Date().toISOString(),
        source: 'Green Tech News',
        sentiment_score: 0.8,
        sentiment_label: 'Positive',
        category: 'Environmental'
    },
    {
        company: 'Tesla',
        title: 'Shareholders Raise Concerns Over Board Independence at Tesla Annual Meeting',
        description: 'Investor groups are pushing for greater board independence and transparency regarding executive compensation packages.',
        content: 'A proposal to appoint an independent chair was debated...',
        url: 'https://example.com/tesla-board',
        image_url: 'https://images.unsplash.com/photo-1551076936-a3206be52140?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 86400000).toISOString(),
        source: 'Finance Daily',
        sentiment_score: -0.4,
        sentiment_label: 'Negative',
        category: 'Governance'
    },
    // Amazon
    {
        company: 'Amazon',
        title: 'Amazon Workers Strike in UK Warehouses Over Pay and Conditions',
        description: 'Hundreds of Amazon warehouse employees in Coventry have walked out in a dispute over pay offers and working conditions.',
        content: 'The GMB union stated that the pay rise offered was insufficient...',
        url: 'https://example.com/amazon-strike',
        image_url: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 172800000).toISOString(),
        source: 'Labor Watch',
        sentiment_score: -0.7,
        sentiment_label: 'Negative',
        category: 'Social'
    },
    {
        company: 'Amazon',
        title: 'Amazon Pledges Additional $50M to Climate Pledge Fund',
        description: 'Amazon is increasing its investment in sustainable technologies to help reach its net-zero carbon goal by 2040.',
        content: 'The funds will support startups developing low-carbon innovations...',
        url: 'https://example.com/amazon-climate',
        image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d8b09?auto=format&fit=crop&q=80',
        published_at: new Date().toISOString(),
        source: 'Eco Business',
        sentiment_score: 0.9,
        sentiment_label: 'Positive',
        category: 'Environmental'
    },
    // BP
    {
        company: 'BP',
        title: 'BP Scales Back Climate Targets citing Energy Security Concerns',
        description: 'BP has announced it will produce more oil and gas for longer, slowing its transition to renewable energy.',
        content: 'The decision has drawn sharp criticism from environmental groups...',
        url: 'https://example.com/bp-targets',
        image_url: 'https://images.unsplash.com/photo-1596766627033-68d1db2654c5?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 259200000).toISOString(),
        source: 'Energy Global',
        sentiment_score: -0.6,
        sentiment_label: 'Negative',
        category: 'Environmental'
    },
    // Patagonia
    {
        company: 'Patagonia',
        title: 'Patagonia Founder Donates Entire Company to Fight Climate Change',
        description: 'Yvon Chouinard has transferred ownership of Patagonia to a trust and non-profit organization to ensure all profits go to saving the planet.',
        content: 'The move is unprecedented in corporate history...',
        url: 'https://example.com/patagonia-donation',
        image_url: 'https://images.unsplash.com/photo-1502472584811-0a2f2ca4295f?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 604800000).toISOString(),
        source: 'Sustainability Weekly',
        sentiment_score: 1.0,
        sentiment_label: 'Positive',
        category: 'Governance'
    },
    // Microsoft
    {
        company: 'Microsoft',
        title: 'Microsoft Release Latest Diversity & Inclusion Report',
        description: 'The report highlights steady progress in increasing representation of women and minority groups in leadership roles.',
        content: 'Microsoft aims to double the number of Black and African American managers...',
        url: 'https://example.com/microsoft-diversity',
        image_url: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 345600000).toISOString(),
        source: 'Tech Inclusion',
        sentiment_score: 0.7,
        sentiment_label: 'Positive',
        category: 'Social'
    },
    // Nestlé
    {
        company: 'Nestlé',
        title: 'Nestlé Faces Scrutiny Over Sugar Content in Baby Food Sold in Developing Nations',
        description: 'A new report claims Nestlé adds sugar to infant milk sold in poorer countries, violating international guidelines.',
        content: 'The investigation revealed differences in product formulations...',
        url: 'https://example.com/nestle-sugar',
        image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 100000000).toISOString(),
        source: 'Health Watch',
        sentiment_score: -0.9,
        sentiment_label: 'Negative',
        category: 'Social'
    },
    // Google
    {
        company: 'Google',
        title: 'Google Updates AI Principles to Address Generative AI Risks',
        description: 'Google has revised its AI governance framework to include strict guidelines on misinformation and bias in large language models.',
        content: 'The update comes amidst growing calls for AI regulation...',
        url: 'https://example.com/google-ai-principles',
        image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 40000000).toISOString(),
        source: 'Tech Policy Journal',
        sentiment_score: 0.5,
        sentiment_label: 'Neutral',
        category: 'Governance'
    },
    // Unilever
    {
        company: 'Unilever',
        title: 'Unilever Claims Progress on Plastic Reduction Goals',
        description: 'The consumer goods giant reports a 15% reduction in virgin plastic use across its packaging portfolio.',
        content: 'Unilever is aiming for 100% reusable, recyclable, or compostable packaging...',
        url: 'https://example.com/unilever-plastic',
        image_url: 'https://images.unsplash.com/photo-1611288870280-4a39556b3c5a?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 200000000).toISOString(),
        source: 'Circular Economy News',
        sentiment_score: 0.6,
        sentiment_label: 'Positive',
        category: 'Environmental'
    },
    // New: Walmart (S & G)
    {
        company: 'Walmart',
        title: 'Walmart Announces New Employee Education Benefits',
        description: 'Walmart is expanding its college tuition coverage program to attract and retain workers in a tight labor market.',
        content: 'The retail giant will now pay 100% of college tuition and books...',
        url: 'https://example.com/walmart-education',
        image_url: 'https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 60000000).toISOString(),
        source: 'Retail Dive',
        sentiment_score: 0.8,
        sentiment_label: 'Positive',
        category: 'Social'
    },
    {
        company: 'Walmart',
        title: 'Walmart Settles Opioid Lawsuit for $3.1 Billion',
        description: 'Walmart has agreed to a nationwide settlement to resolve allegations that it failed to appropriately oversee the dispensing of opioids.',
        content: 'The settlement will outline strict requirements for compliance...',
        url: 'https://example.com/walmart-settlement',
        image_url: 'https://images.unsplash.com/photo-1587563871198-ab46720b66cd?auto=format&fit=crop&q=80',
        published_at: new Date(Date.now() - 120000000).toISOString(),
        source: 'Legal News',
        sentiment_score: -0.8,
        sentiment_label: 'Negative',
        category: 'Governance'
    }
];

// --- ROUTES ---

// 1. Get Articles
app.get('/api/articles', (req, res) => {
    const { company, category } = req.query;

    let filtered = [...MOCK_ARTICLES];

    if (company) {
        filtered = filtered.filter(a => a.company.toLowerCase().includes(company.toLowerCase()));
    }

    if (category && category !== 'All') {
        filtered = filtered.filter(a => a.category === category);
    }

    // Sort by date desc
    filtered.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));

    res.json(filtered);
});

// 2. Get Statistics
app.get('/api/statistics', (req, res) => {
    const { company } = req.query;

    let filtered = [...MOCK_ARTICLES];
    if (company) {
        filtered = filtered.filter(a => a.company === company);
    }

    // Helper for grouping
    const groupCount = (list, key) => {
        const counts = {};
        list.forEach(item => {
            const val = item[key];
            counts[val] = (counts[val] || 0) + 1;
        });
        return Object.entries(counts).map(([k, count]) => ({ [key]: k, count }));
    };

    const sentimentData = groupCount(filtered, 'sentiment_label');
    const categoryData = groupCount(filtered, 'category');

    // Trend (Average Sentiment by Date)
    // Simple grouping by date string
    const trendMap = {};
    filtered.forEach(item => {
        const date = item.published_at.split('T')[0]; // YYYY-MM-DD
        if (!trendMap[date]) {
            trendMap[date] = { sum: 0, count: 0 };
        }
        trendMap[date].sum += item.sentiment_score;
        trendMap[date].count += 1;
    });

    const trendData = Object.entries(trendMap)
        .map(([date, { sum, count }]) => ({
            date,
            avg_sentiment: sum / count
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({
        sentiment: sentimentData,
        category: categoryData,
        trend: trendData
    });
});

// 3. Get Companies
app.get('/api/companies', (req, res) => {
    const unique = [...new Set(MOCK_ARTICLES.map(a => a.company))].sort();
    res.json(unique);
});

// 4. Analyze (AI Simulation) - Independent of DB
app.post('/api/analyze', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text required' });

    // Quick heuristic analysis
    const lowerText = text.toLowerCase();

    // Sentiment
    let score = 0;
    ['bad', 'fail', 'risk', 'strike', 'lawsuit'].forEach(w => lowerText.includes(w) ? score -= 0.2 : 0);
    ['good', 'growth', 'best', 'award', 'sustainable'].forEach(w => lowerText.includes(w) ? score += 0.2 : 0);
    score = Math.max(-1, Math.min(1, score));

    let label = 'Neutral';
    if (score > 0.1) label = 'Positive';
    if (score < -0.1) label = 'Negative';

    // Category
    let category = 'Governance';
    if (lowerText.match(/climate|carbon|energy|green/)) category = 'Environmental';
    if (lowerText.match(/labor|worker|rights|diversity/)) category = 'Social';

    res.json({
        sentiment_score: score,
        sentiment_label: label,
        category,
        summary: "AI Analyzed summary.",
        confidence: 0.9
    });
});

// Export handler for Netlify
module.exports.handler = serverless(app);

// Local Dev Server fall-back
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Local Server running on http://localhost:${PORT}`));
}
