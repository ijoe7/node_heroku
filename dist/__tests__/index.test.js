"use strict";
var request = require('supertest');
var app = require('../index');
var dataFiles = require("../database/database.json");
// beforeEach(() => {
//   app = require("../index");
// });
afterEach(function () {
    app.close();
});
describe('GET /dataFiles', function () {
    test("respond with json containing a list of all dataFiles", function (done) {
        request(app)
            .get("/dataFiles")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
    test("GET /dataFiles/:id respond with a single dataFile", function (done) {
        request(app)
            .get("/dataFiles/1")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
describe("POST /dataFiles", function () {
    var data = {
        organization: "organization",
        products: "products",
        marketValue: "90%",
        address: "sangotedo",
        ceo: "cn",
    };
    it("respond with 201 created", function (done) {
        request(app)
            .post("/dataFiles")
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
        // .end((err: any) => {
        //   if (err) return done(err);
        //   done();
        // });
    });
});
describe("PUT /dataFiles/:id", function () {
    var data = {
        address: "lalaland",
        ceo: "only one!",
    };
    test("Responds with a single dataFile", function (done) {
        request(app)
            .put("/dataFiles/" + dataFiles[dataFiles.length - 1].id)
            .send(data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
        // .end((err: Error) => {
        //   if (err) return done(err);
        //   return done();
        // });
    });
});
describe("DELETE /dataFiles/:id", function () {
    test("Return status 200 after DELETING a dataFile", function (done) {
        request(app)
            .delete("/dataFiles/" + parseInt(dataFiles[dataFiles.length - 1].id))
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
        // .end((err: Error) => {
        //   if (err) return done(err);
        //   return done();
        // });
    });
});
