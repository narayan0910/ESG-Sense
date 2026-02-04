const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'esg.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

function initDb() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      content TEXT,
      url TEXT,
      image_url TEXT,
      published_at DATETIME,
      source TEXT,
      sentiment_score REAL,
      sentiment_label TEXT, -- 'Positive', 'Negative', 'Neutral'
      category TEXT -- 'Environmental', 'Social', 'Governance'
    );
  `;

    db.exec(createTableQuery); // Use exec for simple statements
    console.log('Database initialized and tables ensured.');
}

module.exports = {
    db,
    initDb
};
