import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { NewsAggregator } from './newsAggregator.js';

// Define Mock Server with handlers
const server = setupServer(
  // TechNews API Handler
  http.get('https://api.technews.com/articles', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    if (category === 'tech') {
      return HttpResponse.json({
        articles: [
          { id: 1, title: 'AI Breakthrough', category: 'tech', views: 1000 },
          { id: 2, title: 'New Framework Released', category: 'tech', views: 500 }
        ]
      });
    }

    // Default response without category parameter
    return HttpResponse.json({
      articles: [
        { id: 1, title: 'AI Breakthrough', category: 'tech', views: 1000 },
        { id: 2, title: 'New Framework Released', category: 'tech', views: 500 }
      ]
    });
  }),

  // WorldNews API Handler
  http.get('https://api.worldnews.com/latest', () => {
    return HttpResponse.json({
      articles: [
        { id: 3, title: 'Global Summit', views: 2000 },
        { id: 4, title: 'Climate Action', views: 1500 }
      ]
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('NewsAggregator', () => {
  test('fetches articles from multiple sources', async () => {
    const aggregator = new NewsAggregator();
    const articles = await aggregator.fetchArticles();

    // Assert: Array has 4 articles (2 from TechNews, 2 from WorldNews)
    expect(articles).toHaveLength(4);
    expect(articles[0].title).toBe('AI Breakthrough');
    expect(articles[1].title).toBe('New Framework Released');
    expect(articles[2].title).toBe('Global Summit');
    expect(articles[3].title).toBe('Climate Action');
  });

  test('handles API errors gracefully', async () => {
    // Override TechNews handler to return 500 error
    server.use(
      http.get('https://api.technews.com/articles', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const aggregator = new NewsAggregator();
    const articles = await aggregator.fetchArticles();

    // Assert: Only WorldNews articles (2) are returned, no exception thrown
    expect(articles).toHaveLength(2);
    expect(articles[0].title).toBe('Global Summit');
    expect(articles[1].title).toBe('Climate Action');
  });

  test('fetches articles by category', async () => {
    const aggregator = new NewsAggregator();
    const articles = await aggregator.fetchByCategory('tech');

    // Assert: Only 2 articles with category 'tech' are returned
    expect(articles).toHaveLength(2);
    expect(articles[0].category).toBe('tech');
    expect(articles[1].category).toBe('tech');
  });

  test('throws error when category is missing', async () => {
    const aggregator = new NewsAggregator();

    // Assert: fetchByCategory(null) throws error with message "Category is required"
    await expect(aggregator.fetchByCategory(null)).rejects.toThrow(
      'Category is required'
    );
  });

  test('throws error when category is empty string', async () => {
    const aggregator = new NewsAggregator();

    // Assert: fetchByCategory('') also throws error
    await expect(aggregator.fetchByCategory('')).rejects.toThrow(
      'Category is required'
    );
  });

  test('returns top headlines sorted by views', async () => {
    const aggregator = new NewsAggregator();
    const topHeadlines = await aggregator.getTopHeadlines(3);

    // Assert: 3 articles returned, sorted by views (highest first)
    expect(topHeadlines).toHaveLength(3);
    expect(topHeadlines[0].title).toBe('Global Summit'); // 2000 views
    expect(topHeadlines[0].views).toBe(2000);
    expect(topHeadlines[1].title).toBe('Climate Action'); // 1500 views
    expect(topHeadlines[1].views).toBe(1500);
    expect(topHeadlines[2].title).toBe('AI Breakthrough'); // 1000 views
    expect(topHeadlines[2].views).toBe(1000);
  });

  test('handles 500 server error for TechNews API', async () => {
    // Override TechNews handler to return 500 error only for this test
    server.use(
      http.get('https://api.technews.com/articles', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const aggregator = new NewsAggregator();
    const articles = await aggregator.fetchArticles();

    // Assert: Only WorldNews articles (2) are returned, no exception thrown
    expect(articles).toHaveLength(2);
    expect(articles[0].id).toBe(3);
    expect(articles[1].id).toBe(4);
  });
});
