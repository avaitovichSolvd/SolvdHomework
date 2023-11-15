const request = require("supertest");
const { app, startServer } = require("../server");
const database = require("../db/DBkey");
const clearTestData = require("../ClearTestData");

let server;
let user_id;
let lawyer_id;
let authToken;

beforeAll(async () => {
  try {
    server = await startServer(3006);
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

describe("Chat Controller", () => {
  test("POST /chat/send_message should respond with a success message", async () => {
    const response = await request(app)
      .post("/chat/send_message")
      .send({
        user_id: user_id,
        lawyer_id: lawyer_id,
        message_text: "How are you?",
        sender_type: "user",
      })
      .set("Authorization", `Bearer ${authToken}`);

    console.log(response.body.result);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Message sent successfully"
    );
  });

  test("GET /chat/history?user_id&lawyer_id should respond with a list of fav lawyers", async () => {
    const response = await request(app)
      .get(`/chat/history?user_id=${user_id}&lawyer_id=${lawyer_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
  });

  test("DELETE /chat/history?user_id&lawyer_id should respond with success message", async () => {
    const response = await request(app)
      .delete(`/chat/history?user_id=${user_id}&lawyer_id=${lawyer_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Chat deleted successfully"
    );
  });
});

afterAll(async () => {
  if (server) {
    await database.end();
    await server.close();
  }
});
