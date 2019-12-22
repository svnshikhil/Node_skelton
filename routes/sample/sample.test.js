const request = require('supertest');
const express = require('express');
const sample = require('./sample')
const app = express();

app.get('/sample', sample.getSample);
app.post('/sample', sample.samplePost);


describe('GET /sample', function () {
    it('respond with string', function (done) {
        request(app)
            .get('/sample')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })
});


describe('POST /sample', function () {
    it('respond with json', function (done) {
        request(app)
            .post('/sample')
            .send({
                name: "Test",
                number: 4,
                type: "Street"
            })
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })
});