const WeatherClient = require("./weatherClient");

describe("WeatherClient", () => {
  let client;

  beforeEach(() => {
    client = new WeatherClient("test-api-key");

    jest.spyOn(global, "fetch");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("getWeather", () => {
    test("should fetch weather data successfully", async () => {
      // Arrange
      const mockResponse = {
        location: { name: "Berlin" },
        current: {
          temp_c: 22,
          condition: { text: "Sunny" },
          humidity: 45,
        },
      };

      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act
      const result = await client.getWeather("Berlin");

      // Assert
      expect(result).toEqual({
        city: "Berlin",
        temperature: 22,
        condition: "Sunny",
        humidity: 45,
      });
    });

    test("should call fetch with the correct URL", async () => {
      // Arrange
      const mockResponse = {
        location: { name: "Berlin" },
        current: {
          temp_c: 22,
          condition: { text: "Sunny" },
          humidity: 45,
        },
      };

      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act
      await client.getWeather("Berlin");

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        "https://api.weather.com/v1/weather?city=Berlin&apiKey=test-api-key",
      );
    });

    test("should throw an error when city is missing", async () => {
      await expect(client.getWeather()).rejects.toThrow("City is required");
      await expect(client.getWeather(null)).rejects.toThrow("City is required");
      await expect(client.getWeather("")).rejects.toThrow("City is required");
    });

    test("should throw an error when city is not found", async () => {
      // Arrange
      fetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      // Act & Assert
      await expect(client.getWeather("UnknownCity")).rejects.toThrow(
        "City not found: UnknownCity",
      );
    });

    test("should throw an error when API key is invalid", async () => {
      // Arrange
      fetch.mockResolvedValue({
        ok: false,
        status: 401,
      });

      // Act & Assert
      await expect(client.getWeather("Berlin")).rejects.toThrow(
        "Invalid API key",
      );
    });

    test("should throw an error for other API errors", async () => {
      // Arrange
      fetch.mockResolvedValue({
        ok: false,
        status: 500,
      });

      // Act & Assert
      await expect(client.getWeather("Berlin")).rejects.toThrow(
        "API error: 500",
      );
    });
  });

  describe("getForecast", () => {
    // TODO: Write a test for successful forecast fetch
    test("should fetch forecast data successfully", async () => {
      // Arrange
      const mockResponse = {
        forecast: [
          {
            date: "2024-06-01",
            day: {
              maxtemp_c: 25,
              mintemp_c: 15,
              condition: { text: "Partly cloudy" },
            },
          },
          {
            date: "2024-06-02",
            day: {
              maxtemp_c: 28,
              mintemp_c: 18,
              condition: { text: "Sunny" },
            },
          },
          {
            date: "2024-06-03",
            day: {
              maxtemp_c: 22,
              mintemp_c: 14,
              condition: { text: "Rainy" },
            },
          },
        ],
      };

      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act
      const result = await client.getForecast("Berlin");

      // Assert
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        date: "2024-06-01",
        maxTemp: 25,
        minTemp: 15,
        condition: "Partly cloudy",
      });
      expect(result[1].minTemp).toBe(18);
    });

    test("should use default days value of 3", async () => {
      // Arrange
      const mockResponse = {
        forecast: [
          {
            date: "2024-06-01",
            day: {
              maxtemp_c: 25,
              mintemp_c: 15,
              condition: { text: "Partly cloudy" },
            },
          },
          {
            date: "2024-06-02",
            day: {
              maxtemp_c: 28,
              mintemp_c: 18,
              condition: { text: "Sunny" },
            },
          },
          {
            date: "2024-06-03",
            day: {
              maxtemp_c: 22,
              mintemp_c: 14,
              condition: { text: "Rainy" },
            },
          },
        ],
      };

      fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockResponse,
      });

      // Act
      await client.getForecast("Berlin");

      // Assert
      expect(fetch).toHaveBeenCalledWith(
        "https://api.weather.com/v1/forecast?city=Berlin&days=3&apiKey=test-api-key",
      );
    });

    test("should throw an error for invalid days value", async () => {
      await expect(client.getForecast("Berlin", 0)).rejects.toThrow(
        "Days must be between 1 and 7",
      );
      await expect(client.getForecast("Berlin", 8)).rejects.toThrow(
        "Days must be between 1 and 7",
      );
    });

    test("should throw an error when city is missing", async () => {
      await expect(client.getForecast()).rejects.toThrow("City is required");
      await expect(client.getForecast(null)).rejects.toThrow(
        "City is required",
      );
      await expect(client.getForecast("")).rejects.toThrow("City is required");
    });
  });
});
