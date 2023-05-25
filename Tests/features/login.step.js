const { Given, When, Then } = require("@cucumber/cucumber");
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../../server");
const bcrypt = require("bcrypt");
const UserModel = require("../../backend/Models/User.model");
const { hasIn } = require("lodash");

let response;
let token;
let User = new UserModel;
Given('there is a user with the name {string}, email {string} and the password {string}', async function (name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new UserModel({
    name: name,
    email: email,
    password: hashedPassword
  });
  await user.save();
});

When('the user enters their email {string} and password {string}', async function (email, password) {

  response = await request(app).post("/api/login").send({
    email: email,
    password: password,
  });

  expect(response.status).to.equal(200);
  token = response.token;
  return "User connected";
});


Then('the message {string} is displayed and the user is redirected to the home page.', async function (message) {

});