const { db, initDb } = require('./database');

const mockArticles = [
    // Tesla (E & G focus)
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
    // Amazon (S & E focus)
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
    // BP (E focus - often controversial)
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
    // Patagonia (E focus - champion)
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
    // Microsoft (S & G)
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
    // Nestlé (S - controversies)
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
    // Google (G - AI Ethics)
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
    // Unilever (E)
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
    }
];

function seed() {
    initDb();

    const insertStmt = db.prepare(`
    INSERT INTO articles (company, title, description, content, url, image_url, published_at, source, sentiment_score, sentiment_label, category)
    VALUES (@company, @title, @description, @content, @url, @image_url, @published_at, @source, @sentiment_score, @sentiment_label, @category)
  `);

    const countStmt = db.prepare('SELECT COUNT(*) as count FROM articles');
    const result = countStmt.get();

    if (result.count === 0) {
        console.log('Seeding database...');
        const insertTransaction = db.transaction((articles) => {
            for (const article of articles) {
                insertStmt.run(article);
            }
        });

        insertTransaction(mockArticles);
        console.log('Database seeded successfully.');
    } else {
        console.log('Database already has data. Skipping seed.');
    }
}

seed();
