const request = require("supertest");
const { app, startServer } = require("../server");
const database = require("../db/DBkey");
const clearTestData = require("../ClearTestData");

let server;
const userToCreate = {
  first_name: "Name",
  last_name: "Lastname",
  password: "password123",
  email: "name@example.com",
  phone_number: "1234567890",
};

beforeAll(async () => {
    try {
      server = await startServer(3002);
      await clearTestData();
    } catch (error) {
      console.error("Error starting server:", error);
    }
  });

describe("Auth Controller", () => {
  test("POST /auth/register should respond with user info, token, and a success message", async () => {
    const response = await request(app).post("/auth/register").send(userToCreate);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Operation to add a new user was successful"
    );
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBeDefined();
    expect(response.body).toHaveProperty("user");

    const { user } = response.body;
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("first_name", "Name");
    expect(user).toHaveProperty("last_name", "Lastname");
    expect(user).toHaveProperty("email", "name@example.com");
    expect(user).toHaveProperty("phone_number", "1234567890");
  });

  test("POST /auth/login should respond with a success message and a token", async () => {
    const loginCredentials = {
      email: userToCreate.email,
      password: userToCreate.password,
    };

    const response = await request(app)
      .post("/auth/login")
      .send(loginCredentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Operation to add a new user was successful"
    );
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toBeDefined();
  });
});

afterAll(async () => {
    if (server) {
      await database.end();
      await server.close();
    }
  });
