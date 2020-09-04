import Menu from "../models/Menu";
import Option from "../models/Option"
import request from "supertest";
import { expect } from "chai";
import app from "../index";

const API_PREFIX = "/api/v1"

describe("MENU ROUTES TESTS: /api/v1/menu", () => {

  beforeEach(async () => {
    await Menu.deleteMany({});
  })

  describe("POST /", () => {
    it("should SETUP menu for the day and RETURN status 201", async () => {
      const seed = [
        { title: "Rice and Beef", description: "nice meal", price: 500 },
        { title: "Egg and Sauce", description: "nice meal", price: 1500 }
      ]
      const options = await Option.insertMany(seed);
      const menuOptions = [`${options[0]._id}`, `${options[1]._id}`];
      const res = await request(app)
        .post(API_PREFIX + "/menu")
        .send({ menuOptions })
      expect(res.status).to.equal(201);
      expect(res.body.createdMenu).to.have.property("options").lengthOf(2)
    })

    it("should return 400 error when an invalid meal option id is passed", async () => {
      const menuOptions = ["23334", "33244"]
      const res = await request(app)
        .post(API_PREFIX + "/menu")
        .send({ menuOptions });
      expect(res.status).to.equal(400);
    })


    it("should return 404 error when a non-existing valid meal id is passed", async () => {
      const menuOptions = ["5f3ea5967d987b1182388527", "5f3db3ff3bb54f192d829fe5"]
      const res = await request(app)
        .put(API_PREFIX + "/meals/111111111111")
        .send({ menuOptions });
      expect(res.status).to.equal(404);
      //expect(res.body).to.have.property("error", "Id does not exist!")
    })
  })

  describe("GET /", () => {
    it("should return the menu for the day", async () => {
      const seed = [
        { title: "Rice and Beef", description: "nice meal", price: 500 },
        { title: "Egg and Sauce", description: "nice meal", price: 1500 }
      ]
      const options = await Option.insertMany(seed);
      const menuOptions = [`${options[0]._id}`, `${options[1]._id}`];

      //Bootstrap the menu
      await request(app)
        .post(API_PREFIX + "/menu")
        .send({ menuOptions })

      const res = await request(app)
        .get(API_PREFIX + "/menu");
      expect(res.status).to.equal(200)
      expect(res.body).to.have.property("data").lengthOf(1);
    })
  })
})