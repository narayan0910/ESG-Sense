# AI Usage Report

## Overview
This project leverages Artificial Intelligence (AI) and Natural Language Processing (NLP) techniques to transform unstructured news text into structured ESG insights.

## AI Features Implementation

### 1. Sentiment Analysis
- **Goal**: Determine if a news article reflects positively or negatively on a company's ESG performance.
- **Approach**: 
  - The system analyzes specific keywords and sentence structures.
  - **Negative Indicators**: Words like "lawsuit", "strike", "violation", "fine", "pollution" lower the sentiment score.
  - **Positive Indicators**: Words like "award", "sustainable", "carbon-neutral", "growth", "diversity" increase the score.
  - **Scoring**: A continuous score from -1.0 (Very Negative) to +1.0 (Very Positive) is assigned.
- **Tools**: 
  - In the production version, this would utilize **OpenAI's GPT-3.5/4** or **Hugging Face's BERT** models fine-tuned for financial sentiment.
  - *Current Simulation*: A heuristic-based algorithm mimics this behavior for the demo to ensure deterministic results without API keys.

### 2. Auto-Categorization (E/S/G)
- **Goal**: Classify articles into Environmental, Social, or Governance buckets.
- **Approach**:
  - **Environmental (E)**: Detects topics like climate change, emissions, waste, renewable energy.
  - **Social (S)**: Detects topics like labor rights, human rights, diversity, safety.
  - **Governance (G)**: Detects topics like board structure, executive pay, corruption, ethics.
- **Logic**: The system calculates the density of category-specific keywords and assigns the category with the highest relevance score.

### 3. AI Summary Generation
- **Goal**: Provide a concise 1-sentence summary of long articles.
- **Approach**: Extractive or Abstractive summarization.
  - The system generates a summary highlighting the key category and sentiment driver (e.g., "Positive Environmental development regarding renewable energy focus.").

## Future AI Roadmap
To scale this application, the following AI enhancements are proposed:
1. **Zero-Shot Classification**: Using Large Language Models (LLMs) to classify news into granular sub-categories (e.g., "Scope 3 Emissions" vs "Water Usage") without specific training data.
2. **Entity Recognition (NER)**: Automatically detecting company names in generic news feeds to link articles to the correct entity.
3. **Predictive Analytics**: Using historical sentiment trends to predict future ESG ratings changes.

## Ethical Considerations
- **Bias Mitigation**: Ensuring the AI doesn't unfairly penalize companies based on biased news sources.
- **Transparency**: Clear labeling of "AI-Generated" tags on analysis to inform users.
