const request = require("supertest");
const app = require("./server");

describe("Books API Tests", () => {
  
  test("Retrieve all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: "1", title: "1986", author: "George Orwell" },
      { id: "2", title: "Brave New World", author: "Aldous Huxley" },
    ]);
  });

  test("Retrieve a single book", async () => {
    const response = await request(app).get("/book/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: "1",
      title: "1986",
      author: "George Orwell",
    });
  });

  test("Retrieve a single book that does not exist", async () => {
    const response = await request(app).get("/book/3");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Buch nicht gefunden");
  });

  test("Delete a book", async () => {
    const response = await request(app).delete("/book/1");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
  });

  test("Delete a book that does not exist", async () => {
    const response = await request(app).delete("/book/3");
    expect(response.status).toBe(404);
    expect(response.text).toBe("Buch nicht gefunden");
  });

  test("Add a book", async () => {
    const response = await request(app)
      .post("/book")
      .send({ title: "Testbuch", author: "Herr Müller" });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(String),
      title: "Testbuch",
      author: "Herr Müller"
    });
  });

  test("Add a book with missing title", async () => {
    const response = await request(app)
      .post("/book")
      .send({ author: "Herr Müller" });
    expect(response.status).toBe(400);
    expect(response.text).toBe("Titel oder Autor fehlt");
  });

  test("Add a book with missing author", async () => {
    const response = await request(app)
      .post("/book")
      .send({ title: "Testbuch" });
    expect(response.status).toBe(400);
    expect(response.text).toBe("Titel oder Autor fehlt");
  });
});
