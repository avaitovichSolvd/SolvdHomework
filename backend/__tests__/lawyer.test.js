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

const lawyerToCreate = {
  first_name: "LawName",
  last_name: "LawLastname",
  email: "nameLaw@example.com",
  phone_number: "1234567890",
  branch_of_law: "Criminal law",
  description: "Experience - 15years",
  rate: 5,
  budget: 3000,
};
let user_id;
let authToken;

beforeAll(async () => {
  try {
    server = await startServer(3004);
    await clearTestData();

    const registerResponse = await request(app)
      .post("/auth/register")
      .send(userToCreate);

    console.log("userTest registration: ", registerResponse.body);

    expect(registerResponse.status).toBe(201);

    user_id = registerResponse.body.user.id;
    authToken = registerResponse.body.token;
  } catch (error) {
    console.error("Error starting server:", error);
  }
});

let lawyer_id;

describe("Lawyer Controller", () => {
  test("POST /lawyers/lawyer should respond with lawyer info and a success message", async () => {
    const response = await request(app)
      .post("/lawyers/lawyer")
      .send(lawyerToCreate)
      .set("Authorization", `Bearer ${authToken}`);

    lawyer_id = response.body.result[0].id;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Operation to add a new lawyer was successful"
    );
  });

  test("GET /lawyers/filter should respond with a list of lawyers", async () => {
    const response = await request(app).get("/lawyers/filter");
    // console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
  });

  test("GET /lawyers/filter should respond with a list of lawyers by filters", async () => {
    const response = await request(app).get("/lawyers/filter?minRate=5");
    // console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
  });

  test("PUT /lawyers/lawyer should respond with success message", async () => {
    const response = await request(app)
      .put(`/lawyers/lawyer/${lawyer_id}`)
      .send(lawyerToCreate)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Lawyer profile updated");
  });

  test("DELETE /lawyers/lawyer should respond with success message", async () => {
    const response = await request(app)
      .delete(`/lawyers/lawyer/${lawyer_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Lawyer deleted successfully"
    );
  });
});

afterAll(async () => {
  if (server) {
    await database.end();
    await server.close();
  }
});
