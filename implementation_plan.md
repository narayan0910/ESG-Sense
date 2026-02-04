# ESG News Analyzer & Sentiment Tracker - Implementation Plan

## 1. Project Setup
- **Root Directory**: `esg-news-analyzer`
- **Frontend**: Vite + React + TailwindCSS (for modern, responsive aesthetics)
- **Backend**: Node.js + Express
- **Database**: SQLite (using `better-sqlite3` for a lightweight, file-based SQL solution)
- **AI Integration**: Architecture for OpenAI API (will use mock/simulation for demo if no key is provided)

## 2. Backend Implementation (`/backend`)
- **Dependencies**: `express`, `cors`, `better-sqlite3`, `dotenv`
- **Database Schema**:
  - `articles` table: `id`, `company`, `title`, `content`, `url`, `publishedAt`, `source`
  - `analysis` table: `article_id`, `sentiment_score`, `sentiment_label` (Positive/Neutral/Negative), `category` (E/S/G), `summary`
- **API Routes**:
  - `GET /api/news`: Fetch news with filters (company, category).
  - `GET /api/trends`: Fetch aggregate data for charts.
  - `POST /api/analyze`: Trigger AI analysis (simulated or real).
- **Mock Data**: Seed database with 20-30 sample articles for Tesla, Amazon, etc.

## 3. Frontend Implementation (`/frontend`)
- **Styling**: TailwindCSS with a "Premium" dark/light mode aesthetic (Inter font, glassmorphism).
- **Pages**:
  - **Dashboard**: High-level metrics, pie charts (E/S/G distribution), trend lines.
  - **Company View**: Search bar, specific company timeline, and news cards.
  - **News Feed**: List of articles with sentiment badges and category tags.
- **Components**:
  - `SentimentBadge`: Visual indicator of sentiment.
  - `CategoryTag`: Color-coded E, S, G tags.
  - `NewsCard`: Article display.
  - `TrendChart`: Using `chart.js` or `recharts`.

## 4. AI & NLP Features
- **Sentiment**: Mock function simulating analysis based on keywords (e.g., "emissions" -> E, "strike" -> S). 
- **Summary**: Template-based summary generation for the demo.

## 5. Documentation
- `README.md`: Setup instructions.
- `docs/PROBLEM_STATEMENT.md`
- `docs/AI_USAGE_REPORT.md`

## 6. Execution Steps
1. Initialize Project Structure.
2. Setup Backend & Database.
3. Seed Data.
4. Build Frontend UI.
5. Integration & Testing.
