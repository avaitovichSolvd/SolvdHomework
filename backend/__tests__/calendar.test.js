const request = require("supertest");
const { app, startServer } = require("../server");
const database = require("../db/DBkey");
const clearTestData = require("./ClearTestData");

let server;
let user_id;
let lawyer_id;
let authToken;
let event_id;

beforeAll(async () => {
  try {
    server = await startServer(3005);
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

describe("Calendar Controller", () => {
  test("POST /calendar/event should respond with a success message", async () => {
    const response = await request(app)
      .post("/calendar/event")
      .send({
        user_id: user_id,
        lawyer_id: lawyer_id,
        event_date: "2030-11-12 16:00:00",
        event_description: "Meeting with the client",
      })
      .set("Authorization", `Bearer ${authToken}`);

    event_id = response.body.result.insertId;

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "message",
      "Event created successfully"
    );
  });

  test("POST /calendar/notification should respond with a success message", async () => {
    const response = await request(app)
      .post("/calendar/notification")
      .send({
        user_id: user_id,
        lawyer_id: lawyer_id,
        event_id: event_id,
        sender_type: "lawyer",
      })
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Event details sent to chat successfully"
    );
  });

  test("GET /calendar/list?user_id&lawyer_id should respond with a list of events", async () => {
    const response = await request(app)
      .get(`/calendar/list?user_id=${user_id}&lawyer_id=${lawyer_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("result");
  });

  test("DELETE /calendar/event/:event_id should respond with success message", async () => {
    const response = await request(app)
      .delete(`/calendar/event/${event_id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      "Event deleted successfully"
    );
  });
});

afterAll(async () => {
  if (server) {
    await database.end();
    await server.close();
  }
});
