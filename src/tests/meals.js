import Option from "../models/Option";
import request from "supertest";
import { expect } from "chai";
import app from "../index";

process.env.NODE_ENV = "test"
const API_PREFIX = "/api/v1"

describe("MEALS ROUTES TESTS: api/v1/meals", () => {

  beforeEach(async () => {
    await Option.deleteMany({});
  })

  describe("GET /", () => {
    it("should return all meal options", async () => {
      const seed = [
        { title: "Rice and Beef", description:"nice meal", price: 500 },
        { title: "Egg and Sauce", description:"nice meal", price: 1500 }
      ]
      await Option.insertMany(seed);
      const res = await request(app)
      .get(API_PREFIX + "/meals");

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("data");
      expect(res.body.data.length).to.equal(2);
      expect(res.body.data[0]).to.have.property("title", seed[0].title)
    })
  })

  describe("POST /", () => {
    it("should add a new meal option", async () => {
      const mealOption = { title: "Vegetable and chips", description:"nice meal", price: 1500 }
      const res = await request(app)
      .post(API_PREFIX + "/meals")
      .send(mealOption);
      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("data").to.be.an("object");
      expect(res.body).to.have.property("message", "Meal Option added successfully");
    })
  })

  describe("UPDATE /:mealid", () => {
    it("should update a new meal option", async () => {
      const mealOption = { title: "Vegetable and chips", description:"nice meal", price: 1500 }
      const meal = await Option.create(mealOption);
      const update = { price: 6000 }

      const res = await request(app)
      .put(API_PREFIX + "/meals/" + meal._id)
      .send(update);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("data").to.have.property("_id", `${meal._id}`);
      expect(res.body.data).to.have.property("price", update.price);
    })


    it("should return 400 error when an invalid id is passed", async () => {
      const update = { price: 6000 }
      const res = await request(app)
      .put(API_PREFIX + "/meals/1")
      .send(update);
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Invalid Id")
    })

    it("should return 404 error when a non-existing valid id is passed", async () => {
      const update = { price: 6000 }
      const res = await request(app)
      .put(API_PREFIX + "/meals/111111111111")
      .send(update);
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("error", "Id does not exist!")
    })

  })


  describe("DELETE /:mealid", () => {
    it("should REMOVE a new meal option", async () => {
      const mealOption = { title: "Vegetable and chips", description:"nice meal", price: 1500 }
      const meal = await Option.create(mealOption);

      const res = await request(app)
      .delete(API_PREFIX + "/meals/" + meal._id);
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("data").to.have.property("_id", `${meal._id}`);
      // expect(res.body.data).to.have.property("_id", `${meal._id}`);
    })


    it("should return 400 error when an invalid id is passed", async () => {
      const res = await request(app)
      .delete(API_PREFIX + "/meals/1")
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("error", "Invalid Id")
    })

    it("should return 404 error when a non-existing valid id is passed", async () => {
      const res = await request(app)
      .put(API_PREFIX + "/meals/111111111111")
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("error", "Id does not exist!")
    })

  })

})