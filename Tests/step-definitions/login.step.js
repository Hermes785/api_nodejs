const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require("chai").expect;
const request = require("supertest");
const app = require("./server");
const UserModel = require("../../backend/Models/User.model");

let response;
let token;

Given('there is a user with the email {string} and the password {string}', async function (email, password) {
  const user = new UserModel({
    email: email,
    password: password,
  });
  await user.save();
});

When('the user enters their email and password', async function () {
  response = await request(server).post("/api/login").send({
    email: "ff@gmail.com",
    password: "ff",
  });
  expect(email).to.equal(user.email);
    expect(password).to.equal(user.password);
    expect(response.status).to.equal(200);
  token = response.body.token;
});

Then('the message {string} is displayed and the user is redirected to the home page.', async function (message) {
  expect(response.status).to.equal(200);
  expect(response.body.message).to.equal(message);
  expect(token).to.not.be.undefined;
  expect(token).to.be.a("string");
});
