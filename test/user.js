var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require("mongoose");

var server = require('../server');

var should = chai.should();
chai.use(chaiHttp);


describe('accedo test', function() {
  it('should login successfully', function(done) {
    chai.request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({'username': 'abdul', 'password': 'test@123'})
      .end(function(err, res){
        res.should.have.status(200);
        //res.should.be.json;
        done();
      });
  });
  
  // get single user
  it('should get a user', function(done) {
    chai.request(server)
      .get('/user')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function(err, res){
            if(err){
                console.log("error");
                done(err);
            }
            else {
                //console.log(res);
                done();
            }
        });
  });
});

