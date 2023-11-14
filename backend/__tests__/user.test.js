const request = require("supertest");
const { app, startServer } = require("../server");
const database = require("../db/DBkey");
const clearTestData = require("./ClearTestData");

let server;
let user_id;
let lawyer_id;
let authToken;
let fav_id;

beforeAll(async () => {
  try {
    server = await startServer(3003);
    await clearTestData();

    const user = {
      first_name: "Name",
      last_name: "Lastname",
      password: "password123",
      email: "name@example.com",
      phone_number: "1234567890",
    };

    const registerResponse = await request(app)
      .post("/auth/register")
      .send(user);

    expect(registerResponse.status).toBe(201);
    user_id = registerResponse.body.user.id;
    authToken = registerResponse.body.token;

    const lawyerToCreate = {
      first_name: "LawName",
      last_name: "LawLastname",
      email: "nameLaw@example.com",
      phone_number: "1234567890",
      branch_of_law: "International law",
      description: "Experience - 5years",
      rate: 2,
      budget: 700,
    };

    const lawyerResponse = await request(app)
      .post("/lawyers/lawyer")
      .send(lawyerToCreate)
      .set("Authorization", `Bearer ${authToken}`);
    expect(lawyerResponse.status).toBe(201);
    lawyer_id = lawyerResponse.body.result[0].id;
  } catch (error) {
    console.error("Error in beforeAll:", error);
  }
});

describe("User Controller", () => {
  test("GET /user/users should respond with a list of users", async () => {
    const response = await request(app).get("/user/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("users");
    expect(Array.isArray(response.body.users)).toBe(true);
  });

  test("POST /user/favorite should respond with a success message", async () => {
    const response = await request(app)
      .post("/user/favorite")
      .send({ user_id: user_id, lawyer_id: lawyer_id })
      .set("Authorization", `Bearer ${authToken}`);

    fav_id = response.body.result;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Lawyer profile added to the favorites"
    );
  });

  test("GET /user/favorites/:user_id should respond with a list of fav lawyers", async () => {
    const response = await request(app).get(`/user/favorites/${user_id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
  });

  test("DELETE /user/favorite?user_id&lawyer_id should respond with success message", async () => {
    const response = await request(app)
      .delete(`/user/favorite?user_id=${user_id}&lawyer_id=${lawyer_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Lawyer deleted successfully from list"
    );
  });

  test("DELETE /user/users/:user_id should delete a user", async () => {
    console.log(user_id)
    const deleteUserResponse = await request(app)
      .delete(`/user/users/${user_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    if (deleteUserResponse.status !== 200) {
      console.error(deleteUserResponse.body.error);
    }

    console.log(deleteUserResponse.body)

    expect(deleteUserResponse.status).toBe(200);
    expect(deleteUserResponse.body).toHaveProperty(
      "message",
      "User deleted successfully"
    );
  });
});

afterAll(async () => {
  if (server) {
    await database.end();
    await server.close();
  }
});
