import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { NewsAggregator } from "./newsAggregator.js";

// TODO: Define Mock Server with handlers
const server = setupServer(
  http.get("https://api.technews.com/articles", ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    if (category) {
      return HttpResponse.json({
        articles: [
          { id: 5, title: `Tech Article in ${category}`, category, views: 120 },
        ],
      });
    }

    return HttpResponse.json({
      articles: [
        { id: 1, title: "Tech Article 1", views: 100 },
        { id: 2, title: "Tech Article 2", views: 150 },
      ],
    });
  }),
  http.get("https://api.worldnews.com/latest", () => {
    return HttpResponse.json({
      articles: [
        { id: 3, title: "World News Article 1", views: 200 },
        { id: 4, title: "World News Article 2", views: 50 },
      ],
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("NewsAggregator", () => {
  test("fetches articles from multiple sources", async () => {
    // Arrange
    const aggregator = new NewsAggregator();

    // Act
    const articles = await aggregator.fetchArticles();

    // Assert
    expect(articles).toHaveLength(4);
    expect(articles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Tech Article 1" }),
        expect.objectContaining({ title: "Tech Article 2" }),
        expect.objectContaining({ title: "World News Article 1" }),
        expect.objectContaining({ title: "World News Article 2" }),
      ]),
    );
  });

  test("handles API errors gracefully", async () => {
    // Arrange
    server.use(
      http.get("https://api.technews.com/articles", () => {
        return HttpResponse.status(500);
      }),
    );
    const aggregator = new NewsAggregator();

    // Act
    const articles = await aggregator.fetchArticles();

    // Assert
    expect(articles).toHaveLength(2); // Only articles from world news should be returned
    expect(articles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "World News Article 1" }),
        expect.objectContaining({ title: "World News Article 2" }),
      ]),
    );
  });

  test("fetches articles by category", async () => {
    // Arrange
    const aggregator = new NewsAggregator();

    // Act
    const articles = await aggregator.fetchByCategory("AI");

    // Assert
    expect(articles).toHaveLength(1);
    expect(articles[0]).toEqual(
      expect.objectContaining({ title: "Tech Article in AI", category: "AI" }),
    );
  });

  test("throws error when category is missing", async () => {
    // Arrange
    const aggregator = new NewsAggregator();

    // Act & Assert
    await expect(aggregator.fetchByCategory()).rejects.toThrow(
      "Category is required",
    );
  });

  test("returns top headlines sorted by views", async () => {
    // Arrange
    const aggregator = new NewsAggregator();

    // Act
    const topHeadlines = await aggregator.getTopHeadlines(3);

    // Assert
    expect(topHeadlines).toHaveLength(3);
    expect(topHeadlines[0]).toEqual(
      expect.objectContaining({ title: "World News Article 1", views: 200 }),
    );
    expect(topHeadlines[1]).toEqual(
      expect.objectContaining({ title: "Tech Article 2", views: 150 }),
    );
    expect(topHeadlines[2]).toEqual(
      expect.objectContaining({ title: "Tech Article 1", views: 100 }),
    );
  });

  test("handles 500 server error", async () => {
    // Arrange
    server.use(
      http.get("https://api.technews.com/articles", () => {
        return HttpResponse.status(500);
      }),
    );
    const aggregator = new NewsAggregator();

    // Act & Assert
    await expect(aggregator.fetchArticles()).resolves.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "World News Article 1" }),
        expect.objectContaining({ title: "World News Article 2" }),
      ]),
    );
  });
});
