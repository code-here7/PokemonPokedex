const request = require("supertest");
const app = require("../app");
let pokemons = require("../data/pokedexData");

beforeEach(() => {
  pokemons.length = 0;
});

test("GET /api/pokedox - should return all pokemons", async () => {
  const res = await request(app).get("/api/pokedox/allPokemons");

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(Array.isArray(res.body.data)).toBe(true);
});

test("POST /api/pokedox - should return all pokemons with newly added data", async () => {
  const res = await request(app).post("/api/pokedox/addPokemon");

  expect(res.statusCode).toBe(201);
  expect(res.body.success).toBe(true);
  expect(Array.isArray(res.body.data)).toBe(true);
});

test("DELETE /api/pokedox - should delete an existing pokemon", async () => {
  await request(app)
    .post("/api/pokedox/addPokemon")
    .send({ id: 999, name: "TempPokemon", type: "Normal" });
  const res = await request(app).delete("/api/pokedox/deletePokemon/999");

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.message).toMatch(/deleted/i);
  expect(Array.isArray(res.body.data)).toBe(true);
  expect(res.body.data.find((p) => p.id === 999)).toBeUndefined();
});

test("DELETE /api/pokedox - should return 404 if pokemon not found", async () => {
  const res = await request(app).delete("/api/pokedox/deletePokemon/999");

  expect(res.statusCode).toBe(404);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toMatch(/not found/i);
});

test("PUT /api/pokedox - should Edit an existing pokemon", async () => {
  await request(app)
    .post("/api/pokedox/addPokemon")
    .send({ id: 999, name: "UpdatedPokemon", type: "Fire" });
    
  const res = await request(app).put("/api/pokedox/editPokemon/edit?id=999").send({ name: "UpdatedPokemon", type: "Fire" });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.message).toMatch(/updated/i);
  expect(Array.isArray(res.body.data)).toBe(true);

  const updated = res.body.data.find((p) => p.id === 999);
  expect(updated).toBeDefined();
  expect(updated.name).toBe("UpdatedPokemon");
  expect(updated.type).toBe("Fire");
});

test("PUT /api/pokedox - should return 404 if pokemon not found", async () => {
  const res = await request(app).put("/api/pokedox/editPokemon/edit?id=99999");

  expect(res.statusCode).toBe(404);
  expect(res.body.success).toBe(false);
  expect(res.body.message).toMatch(/not found/i);
});
