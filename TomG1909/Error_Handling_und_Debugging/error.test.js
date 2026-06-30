const request = require("supertest");
const app = require("./server"); // Der Pfad zu deiner Express-App

describe("Buch-API", () => {
  beforeEach(() => {
    app.locals.books = [
      { id: 1, title: "1984", author: "George Orwell" },
      { id: 2, title: "Brave New World", author: "Aldous Huxley" },
    ];
    app.locals.nextId = 3;
  });

  test("1️⃣ Neues Buch bekommt eindeutige ID", async () => {
    const res = await request(app)
      .post("/book")
      .send({ title: "Testbuch", author: "Ich" });
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(3);
    const list = await request(app).get("/books");
    expect(list.body.length).toBe(3);
  });

  test("2️⃣ Löschen eines nicht vorhandenen Buches gibt 404 zurück", async () => {
    const res = await request(app).delete("/book/999");
    expect(res.status).toBe(404);
    const list = await request(app).get("/books");
    expect(list.body.length).toBe(2);
  });

  test("3️⃣ Nach Hinzufügen ist /books abrufbar", async () => {
    const add = await request(app)
      .post("/book")
      .send({ title: "Neues Buch", author: "Autor" });
    expect(add.status).toBe(201);
    const list = await request(app).get("/books");
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBe(3);
  });

  test("4️⃣ Fehlende Felder führen zu 400", async () => {
    const res = await request(app).post("/book").send({ title: "Ohne Autor" });
    expect(res.status).toBe(400);
    expect(res.text).toContain("Titel oder Autor fehlt");
    const list = await request(app).get("/books");
    expect(list.body.length).toBe(2);
  });

  test("5️⃣ Keine doppelten Antworten bei Fehlern", async () => {
    const res = await request(app).post("/book").send({ title: "NurTitel" });
    expect(res.status).toBe(400);
    expect(res.headers["content-type"]).toMatch(/text/);
  });
});
