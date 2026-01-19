const WeatherClient = require("./weatherClient");

describe("WeatherClient", () => {
  let client;

  beforeEach(() => {
    client = new WeatherClient("test-api-key");
    // Spy auf global.fetch - kann später mit jest.restoreAllMocks() restored werden
    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Original fetch wiederherstellen
  });

  describe("getWeather", () => {
    // TODO: Write a test for successful weather fetch
    // Tip: Mock fetch with mockResolvedValue, use async/await
    // Example response structure:
    // {
    //   location: { name: 'Berlin' },
    //   current: {
    //     temp_c: 22,
    //     condition: { text: 'Sunny' },
    //     humidity: 45
    //   }
    // }
    test("returns weather data for valid city", async () => {
      // Arrange - Mock the API response
      const mockResponse = {
        location: { name: "Berlin" },
        current: {
          temp_c: 22,
          condition: { text: "Sunny" },
          humidity: 45,
        },
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act - Call the function
      const weather = await client.getWeather("Berlin");

      // Assert - Check the result
      expect(weather).toEqual({
        city: "Berlin",
        temperature: 22,
        condition: "Sunny",
        humidity: 45,
      });
    });

    test("handles no city provided error", async () => {
      await expect(client.getWeather()).rejects.toThrow("City is required");
    });

    test("handles city not found error", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(client.getWeather("UnknownCity")).rejects.toThrow(
        "City not found: UnknownCity",
      );
    });

    test("handles invalid api key error", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 401,
      });
      await expect(client.getWeather("Berlin")).rejects.toThrow(
        "Invalid API key",
      );
    });

    test("called with correct URL", async () => {
      // Arrange - Mock the API response
      const mockResponse = {
        location: { name: "Berlin" },
        current: {
          temp_c: 22,
          condition: { text: "Sunny" },
          humidity: 45,
        },
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act - Call the function
      await client.getWeather("Berlin");

      // Assert - Check that fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.weather.com/v1/weather?city=Berlin&apiKey=test-api-key",
      );
    });

    test("handles other api errors", async () => {
      global.fetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(client.getWeather("Berlin")).rejects.toThrow(
        "API error: 500",
      );
    });
    // TODO: Write a test that verifies fetch is called with the correct URL
    // Tip: expect(fetch).toHaveBeenCalledWith(...)

    // TODO: Write a test that checks an error is thrown when city is missing
    // Tip: await expect(client.getWeather()).rejects.toThrow('City is required')

    // TODO: Write a test for 404 error (City not found)
    // Tip: Mock fetch with { ok: false, status: 404 }

    // TODO: Write a test for 401 error (Invalid API key)

    // TODO: Write a test for other API errors (e.g. 500)
  });

  describe("getForecast", () => {
    test("returns forecast data for valid city and days", async () => {
      // Arrange - Mock the API response
      const mockResponse = {
        forecast: [
          {
            date: "2024-06-01",
            day: {
              maxtemp_c: 25,
              mintemp_c: 15,
              condition: { text: "Partly Cloudy" },
            },
          },
          {
            date: "2024-06-02",
            day: {
              maxtemp_c: 27,
              mintemp_c: 16,
              condition: { text: "Sunny" },
            },
          },
          {
            date: "2024-06-03",
            day: {
              maxtemp_c: 23,
              mintemp_c: 14,
              condition: { text: "Rain" },
            },
          },
        ],
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act - Call the function
      const forecast = await client.getForecast("Berlin", 3);

      // Assert - Check the result
      expect(forecast).toEqual([
        {
          date: "2024-06-01",
          maxTemp: 25,
          minTemp: 15,
          condition: "Partly Cloudy",
        },
        {
          date: "2024-06-02",
          maxTemp: 27,
          minTemp: 16,
          condition: "Sunny",
        },
        {
          date: "2024-06-03",
          maxTemp: 23,
          minTemp: 14,
          condition: "Rain",
        },
      ]);
    });

    test("uses default days=3 when not provided", async () => {
      // Arrange - Mock the API response
      const mockResponse = {
        forecast: [],
      };

      global.fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act - Call the function without days
      await client.getForecast("Berlin");

      // Assert - Check that fetch was called with days=3
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.weather.com/v1/forecast?city=Berlin&days=3&apiKey=test-api-key",
      );
    });

    test("throws error for entering 0 day", async () => {
      await expect(client.getForecast("Berlin", 0)).rejects.toThrow(
        "Days must be between 1 and 7",
      );
    });

    test("throws error for entering more than 7 days", async () => {
      await expect(client.getForecast("Berlin", 8)).rejects.toThrow(
        "Days must be between 1 and 7",
      );
    });

    test("throws error when city is missing", async () => {
      await expect(client.getForecast()).rejects.toThrow("City is required");
    });

    // TODO: Write a test for successful forecast fetch
    // Tip: Mock response should contain a forecast array

    // TODO: Write a test that verifies days=3 is used as default

    // TODO: Write tests for invalid days values (< 1 or > 7)

    // TODO: Write a test that checks an error is thrown when city is missing
  });
});
