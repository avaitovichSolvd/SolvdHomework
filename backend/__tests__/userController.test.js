const request = require("supertest");
const app = require("../server");
const userModel = require("../src/models/userModel");
const database = require("../db/DBkey")

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const clearTestData = async () => {
  await database.promise().query("DELETE FROM user");
};

beforeAll(async () => {
  await clearTestData();
});

describe("User Controller", () => {
  test("GET /user/users should respond with a list of users", async () => {
    const response = await request(app).get("/user/users");

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("users");
    expect(Array.isArray(response.body.users)).toBe(true);

    expect(userModel.getUserList).toHaveBeenCalled();
  });
});

afterAll(async () => {
  await database.end();
});

// npm run test:custom-port
