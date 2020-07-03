'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

const app = require('../app');
//
const { users, goals, daily_schedules } = require('../models');
const usersFixture = require('./fixtures/users.json');
//const urlsFixture = require('./fixtures/urls.json');

describe('Test to see if the server is open', () => {
  describe('GET /', () => {
    it('should redirect Url to baseUrl', done => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }

          expect(res.status).to.equal(200);
          expect(res.text).to.equal('Success');
          done();
        });
    });
  });
});

describe('Bare Minimum Requirements', () => {
  beforeEach(async () => {
    // Setup/TearDown : Check Fixtures folder
    await users.destroy({ where: {}, truncate: {cascase: true} });
    await users.create(usersFixture[0]);
  });

  describe('POST /user/signup', () => {
    it('should respond user info to signup data', done => {
      chai
        .request(app)
        .post('/user/signup')
        .send({
          username: 'testuser',
          email: 'test@gmail.com',
          password: 'asdfasdf'
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(200);
          // expect(res.body).has.all.keys([
          //   'id',
          //   'email',
          //   'password',
          //   'username',
          // ]);
          expect(res.body.message).has.equal('success');
          done();
        });
    });

    it('should respond conflict with existing user email', done => {
      chai
        .request(app)
        .post('/user/signup')
        .send({
          email: 'wonjun@test.com',
          username: 'tester',
          password: '1234'
        })
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          expect(res).to.have.status(409);
          expect(res.body.message).to.equal('Already exists user');
          done();
        });
    });
  });

  describe('POST /user/signin', () => {
    it('should respond user id to signin data', done => {
      chai
        .request(app)
        .post('/user/signin')
        .send({
          email: 'wonjun@test.com',
          password: '1234'
        })
        .end((err, res) => {
          expect(res.body).has.all.keys(['id']);
          done();
        });
    });

    it('should respond NOT FOUND with unvalid user', done => {
      chai
        .request(app)
        .post('/user/signin')
        .send({
          email: 'foo@gmail.com',
          password: 'swiss'
        })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.body.message).to.equal('unvalid user');
          done();
        });
    });
  });

  // describe('GET /user/info', () => {
  //   it('should return user data with request of session.userid', done => {
  //     const agent = chai.request.agent(app);
  //     agent
  //       .post('/user/signin')
  //       .send({
  //         email: 'duhyun.kim@codestates.com',
  //         password: '1234'
  //       })
  //       .then(function(res) {
  //         agent
  //           .get('/user/info')
  //           .then(function(res2) {
  //             // should get status 200, which indicates req.session existence.
  //             expect(res2).to.have.status(200);
  //             expect(res2.body).has.all.keys([
  //               'id',
  //               'email',
  //               'password',
  //               'username',
  //               'updatedAt',
  //               'createdAt'
  //             ]);
  //             done();
  //           })
  //           .catch(err => {
  //             done(err);
  //           });
  //       });
  //   });

  //   it('should return Unauthorized if request without session.userid', done => {
  //     const agent = chai.request.agent(app);
  //     agent
  //       .post('/user/signin')
  //       .send({
  //         email: 'foo@gmail.com',
  //         password: 'swiss'
  //       })
  //       .then(function(res) {
  //         agent
  //           .get('/user/info')
  //           .then(function(res2) {
  //             // should get status 200, which indicates req.session existence.
  //             expect(res2).to.have.status(401);
  //             expect(res2.text).to.equal('need user session');
  //             done();
  //           })
  //           .catch(err => {
  //             done(err);
  //           });
  //       });
  //   });
  // });

  // describe('POST /user/signout', () => {
  //   it('should redirect {BASE_URL}/ to signout', done => {
  //     chai
  //       .request(app)
  //       .post('/user/signout')
  //       .set({ host: 'localhost:8080' })
  //       .end((err, res) => {
  //         if (err) {
  //           done(err);
  //           return;
  //         }
  //         expect(res.redirects[0]).to.not.an('undefined');

  //         done();
  //       });
  //   });
  // });
});
