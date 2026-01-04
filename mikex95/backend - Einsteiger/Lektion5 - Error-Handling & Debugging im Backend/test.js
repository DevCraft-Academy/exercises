const request = require("supertest");
const app = require("./path_to_fixed_code");

describe("Books API Tests", () => {
  test("Retrieve a single book", async () => {
    const response = await request(app).get("/book/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: "1984",
      author: "George Orwell",
    });
  });

  test("Attempt to retrieve a non-existent book", async () => {
    const response = await request(app).get("/book/100");
    expect(response.status).toBe(404);
  });

  test("Delete a book", async () => {
    const response = await request(app).delete("/book/1");
    expect(response.status).toBe(200);
    expect(response.text).toBe("OK");
  });

  test("Attempt to delete a non-existent book", async () => {
    const response = await request(app).delete("/book/100");
    expect(response.status).toBe(404);
  });

  test("Add a new book", async () => {
    const newBook = { title: "Moby Dick", author: "Herman Melville" };
    const response = await request(app).post("/book").send(newBook);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 3, ...newBook });
  });

  test("Attempt to add a book without title or author", async () => {
    const response = await request(app)
      .post("/book")
      .send({ title: "Moby Dick" });
    expect(response.status).toBe(400);
  });

  test("Retrieve all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });
});
