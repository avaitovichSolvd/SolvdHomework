const request = require("supertest");
const { app, startServer } = require("../server");
const userModel = require("../src/models/userModel");
const database = require("../db/DBkey");

const clearTestData = async () => {
  await database.promise().query("DELETE FROM user");
};

let server;
let user_id;
let authToken;

beforeAll(async () => {
  server = await startServer(3001);
  await clearTestData();

  const user = {
    first_name: "Name",
    last_name: "Lastname",
    password: "password123",
    email: "name@example.com",
    phone_number: "1234567890",
  };

  const registerResponse = await request(app).post("/auth/register").send(user);

  expect(registerResponse.status).toBe(201);
  console.log(registerResponse.body);
  user_id = registerResponse.body.user.id;
  authToken = registerResponse.body.token;
});

describe("User Controller", () => {
  test("GET /user/users should respond with a list of users", async () => {
    const spy = jest.spyOn(userModel, "getUserList");

    const response = await request(app).get("/user/users");

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("users");
    expect(Array.isArray(response.body.users)).toBe(true);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("DELETE /users/:user_id should delete a user", async () => {
    const deleteUserResponse = await request(app)
      .delete(`/user/users/${user_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    console.log(deleteUserResponse.status);
    console.log(deleteUserResponse.body);

    expect(deleteUserResponse.status).toBe(200);
    expect(deleteUserResponse.body).toHaveProperty(
      "message",
      "User deleted successfully"
    );
  });
});

afterAll(async () => {
  await database.end();
  await server.close();
});

// npm run test:custom-port
// "start": "node server.js",
// "test": "DB_HOST=localhost DB_USER=root DB_PASSWORD=YCABtPLrKbCk DB_NAME=testDB PORT=3001 jest",
// "test:custom-port": "set PORT=3001 && jest --detectOpenHandles"