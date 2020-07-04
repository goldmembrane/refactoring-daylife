// 'use strict';

// const chai = require('chai');
// const chaiHttp = require('chai-http');

// const expect = chai.expect;

// chai.use(chaiHttp);

// const app = require('../app');
// //
// const { users, goals, daily_schedules } = require('./database/models');
// const usersFixture = require('./fixtures/users.json');
// const goalsFixture = require('./fixtures/goals.json');
// const schedulesFixture = require('./fixtures/schedules.json');

// describe('Test to see if the server is open', () => {
//   describe('GET /', () => {
//     it('should redirect Url to baseUrl', done => {
//       chai
//         .request(app)
//         .get('/')
//         .end((err, res) => {
//           if (err) {
//             done(err);
//             return;
//           }

//           expect(res.status).to.equal(200);
//           expect(res.text).to.equal('Success');
//           done();
//         });
//     });
//   });
// });

// describe('Bare Minimum Requirements - plans', () => {
//   // beforeEach(async () => {
//   //   // Setup/TearDown : Check Fixtures folder

//   //   await users.destroy({ where: {}, truncate: { cascase: true } });
//   //   await users.create(usersFixture[0]);
//   // });
//   // beforeEach(async () => {
//   //   // await users.destroy({ where: {}, truncate: { cascase: true } });
//   //   // await users.create(usersFixture[0]);
//   //   await goals.destroy({ where: {}, truncate: true });
//   //   await goals.create(goalsFixture[0]);
//   // });

//   // describe('goals tests', () => {
    
    
//   //   //goal 생성
//   //   describe('POST /plans/goals/post', () => {
//   //     it('goals가 성공적으로 생성 생성된 일정정보: 2020-7 monthly open service', done => {
//   //       const agent = chai.request.agent(app);
//   //       agent //선 로그인
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'wonjun@test.com',
//   //           password: '1234'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .post('/plans/goals/post')
//   //             .send({
//   //               category: "monthly",
//   //               name: "open service",
//   //               year: 2020,
//   //               day: 7,
//   //               user_id: 1
//   //             })
//   //             .end((err, res) => {
//   //               if (err) {
//   //                 done(err);
//   //                 return;
//   //               }
//   //               //console.log(res.body);
//   //               expect(res).to.have.status(201);
//   //               expect(res.body.message).has.equal('success');
//   //               done();
//   //             });
//   //         });

//   //     });
      
//   //     //DB not null속성 추가, -> 생성 안되게 하는 메소드 추가 바람
//   //   });

//   //   //goal 탐색
//   //   describe('GET /plans/goals/get', () => {
//   //     //body param이 아닌 path param사용 필요, API 수정 
//   //     //주소 예시 /plans/goals/get:weekly/:2020/:27/
//   //     it('제대로 생성이 되었는지 확인, 로그인된 유저가 제대로 정보를 받을 수 있는지 확인', done => {
//   //       const agent = chai.request.agent(app);
//   //       agent //선 로그인
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'wonjun@test.com',
//   //           password: '1234'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .get('/plans/goals/get?category=monthly&year=2020&day=7')
//   //             .then(function (res2) {
//   //               // should get status 200, which indicates req.session existence.
//   //               //console.log(res2.status);
//   //               expect(res2).to.have.status(200);
//   //               console.log(res2.body);
//   //               expect(res2.body[0]).has.all.keys([
//   //                 'id',
//   //                 'category',
//   //                 'name',
//   //                 'year',
//   //                 'day',
//   //                 'is_done',
//   //                 'user_id'
//   //               ]);
//   //               expect(res2.body[0].name).to.equal("open service");
//   //               done();
//   //             })
//   //             .catch(err => {
//   //               done(err);
//   //             });
//   //         });
//   //     });

//   //     it('인증되지 않은 유저는 goals를 가지고 올 수 없다', done => {
//   //       const agent = chai.request.agent(app);
//   //       agent
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'foo@gmail.com',
//   //           password: 'swiss'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .get('/plans/goals/get')
//   //             .then(function (res2) {
//   //               // should get status 200, which indicates req.session existence.
//   //               expect(res2).to.have.status(401);
//   //               expect(res2.body.message).to.equal('need user session');
//   //               done();
//   //             })
//   //             .catch(err => {
//   //               done(err);
//   //             });
//   //         });
//   //     });
//   //   });
//   //   //goal 변경
//   //   //path param사용 /plans/goals/:1/
//   //   describe('PUT /plans/goals/put', () => {
//   //     it('자신의 목표를 수정할 수 있다.', done => {
//   //       const agent = chai.request.agent(app);
//   //       agent
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'wonjun@test.com',
//   //           password: '1234'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .put('/plans/goals/put?id=2')
//   //             .send({
//   //               "category": "weekly",
//   //               "name": "open server",
//   //               "year": 2020,
//   //               "day": 27,
//   //               "is_done": true,
//   //               "user_id": 1
//   //             })
//   //             .end((err, res) => {
//   //               if (err) {
//   //                 done(err);
//   //                 return;
//   //               }
//   //               //console.log(res.body);
//   //               expect(res).to.have.status(201);
//   //               expect(res.body.message).to.equal("success");
//   //               done();

//   //               //put의 반환값은 변경된 데이터
//   //             });
//   //         });
//   //     });
//   //     ////수정 확인은 DB에서... beforeeach구문 필요
//   //     // it('제대로 수정이 되었는지 확인', done => {
//   //     //   const agent = chai.request.agent(app);
//   //     //   agent //선 로그인
//   //     //     .post('/user/signin')
//   //     //     .send({
//   //     //       email: 'wonjun@test.com',
//   //     //       password: '1234'
//   //     //     })
//   //     //     .then(function (res) {
//   //     //       agent
//   //     //         .get('/plans/goals/get?category=monthly&year=2020&day=7')
//   //     //         .then(function (res2) {
//   //     //           // should get status 200, which indicates req.session existence.
//   //     //           //console.log(res2.status);
//   //     //           expect(res2).to.have.status(200);
//   //     //           console.log(res2.body);

//   //     //           expect(res2.body[0].is_done).to.equal(true);
//   //     //           done();
//   //     //         })
//   //     //         .catch(err => {
//   //     //           done(err);
//   //     //         });
//   //     //     });
//   //     // });

//   //     it('없는 목표 수정 불가', done => {
//   //       const agent = chai.request.agent(app);
//   //       agent
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'wonjun@test.com',
//   //           password: '1234'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .put('/plans/goals/put?id=100')
//   //             .send({
//   //               "category": "weekly",
//   //               "name": "open server",
//   //               "year": 2020,
//   //               "day": 27,
//   //               "is_done": true,
//   //               "user_id": 1
//   //             })
//   //             .then(function (res2) {
//   //               expect(res2).to.have.status(404);
//   //               //expect(res2.body.message).to.equal('cannot found'); //에러핸들링 필요
//   //               done();
//   //             })
//   //             .catch(err => {
//   //               done(err);
//   //             });
//   //         });
//   //     });

//   //   });

//   //   //goal 삭제
//   //   describe('DELETE /plans/goals/delete/:id', () => {
//   //     it('자신의 목표를 삭제할 수 있다.', done => {
//   //       const agent = chai.request.agent(app);
//   //       agent
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'wonjun@test.com',
//   //           password: '1234'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .delete('/plans/goals/delete?id=5')
//   //             .end((err, res) => {
//   //               if (err) {
//   //                 done(err);
//   //                 return;
//   //               }
//   //               expect(res).to.have.status(200);
//   //               expect(res.body.message).has.equal('success');
//   //               done();
//   //             });
//   //         });
//   //     });
      
//   //     it('삭제', done => {
//   //       const agent = chai.request.agent(app);
//   //       agent //선 로그인
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'wonjun@test.com',
//   //           password: '1234'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .get('/plans/goals/get?category=monthly&year=2020&day=7')
//   //             .then(function (res2) {
//   //               // should get status 200, which indicates req.session existence.
//   //               //console.log(res2.status);
//   //               console.log('delete');
//   //               console.log(res2.body)
                
//   //               done();
//   //             })
//   //             .catch(err => {
//   //               done(err);
//   //             });
//   //         });
//   //     });

//   //     it('없는 목표나 권한이 없는 목표 삭제 불가', done => {
//   //       const agent = chai.request.agent(app);

//   //       agent
//   //         .post('/user/signin')
//   //         .send({
//   //           email: 'wonjun@test.com',
//   //           password: '1234'
//   //         })
//   //         .then(function (res) {
//   //           agent
//   //             .delete('/plans/goals/delete?id=100')
//   //             .then(function (res2) {
//   //               expect(res2).to.have.status(404);
//   //               expect(res2.body.message).to.equal('cannot found');
//   //               done();
//   //             })
//   //             .catch(err => {
//   //               done(err);
//   //             });
//   //         });
//   //     });

//   //   });
//   // });
//   describe('schedules tests', () => {
  
//     //schedules 생성
//     describe('POST /plans/schedules/post', () => {
//       it('일정이 성공적으로 생성', done => {
//         const agent = chai.request.agent(app);
//         agent //선 로그인
//           .post('/user/signin')
//           .send({
//             email: 'wonjun@test.com',
//             password: '1234'
//           })
//           .then(function (res) {
//             agent
//               .post('/plans/schedules/post')
//               .send({
//                 'name': 'aws',
//                 'user_id': 1,
//                 'start': '06:00:00',
//                 'end': '23:00:00',
//                 'date': '2020-07-01'
//               })
//               .end((err, res) => {
//                 if (err) {
//                   done(err);
//                   return;
//                 }
//                 //console.log(res.body);
//                 //console.log(res);
//                 expect(res).to.have.status(201);
//                 expect(res.body.message).has.equal('success');
//                 done();
//               });
//           });

//       });
//     });

//     //schedules 탐색
//     describe('GET /plans/goals/get', () => {
//       //body param이 아닌 path param사용 필요, API 수정 
//       //주소 예시 /plans/goals/get:weekly/:2020/:27/
//       it('제대로 생성이 되었는지 확인, 로그인된 유저가 제대로 정보를 받을 수 있는지 확인', done => {
//         const agent = chai.request.agent(app);
//         agent //선 로그인
//           .post('/user/signin')
//           .send({
//             email: 'wonjun@test.com',
//             password: '1234'
//           })
//           .then(function (res) {
//             agent
//               .get('/plans/schedules/get?date=2020-07-01')
//               .then(function (res2) {
//                 // should get status 200, which indicates req.session existence.
//                 //console.log(res2.status);
//                 expect(res2).to.have.status(200);
//                 console.log(res2.body);
//                 expect(res2.body[0]).has.all.keys([
//                   'id',
//                   'name',
//                   'is_done',
//                   'user_id',
//                   'start',
//                   'end',
//                   'date'
//                 ]);
//                 done();
//               })
//               .catch(err => {
//                 done(err);
//               });
//           });
//       });

//       it('인증되지 않은 유저는 일정을 가지고 올 수 없다', done => {
//         const agent = chai.request.agent(app);
//         agent
//           .post('/user/signin')
//           .send({
//             email: 'foo@gmail.com',
//             password: 'swiss'
//           })
//           .then(function (res) {
//             agent
//               .get('/plans/schedules/get?date=2020-07-01')
//               .then(function (res2) {
//                 // should get status 200, which indicates req.session existence.
//                 expect(res2).to.have.status(401);
//                 expect(res2.body.message).to.equal('need user session');
//                 done();
//               })
//               .catch(err => {
//                 done(err);
//               });
//           });
//       });
//     });
//     //schedules 변경
//     //path param사용 
//     describe('PUT /plans/schedules/put?id=1', () => {
//       it('자신의 목표를 수정할 수 있다.', done => {
//         const agent = chai.request.agent(app);
//         agent
//           .post('/user/signin')
//           .send({
//             email: 'wonjun@test.com',
//             password: '1234'
//           })
//           .then(function (res) {
//             agent
//               .put('/plans/schedules/put?id=2')
//               .send({
//                 'name': 'aws',
//                 'is_done': true,
//                 'user_id': 1,
//                 'start': '06:00:00',
//                 'end': '23:00:00',
//                 'date': '2020-07-01'
//               })
//               .end((err, res) => {
//                 if (err) {
//                   done(err);
//                   return;
//                 }
//                 //console.log(res.body);
//                 expect(res).to.have.status(201);
//                 expect(res.body.message).to.equal("success");
//                 done();

//                 //put의 반환값은 변경된 데이터
//               });
//           });
//       });

//       it('없는 목표 수정 불가', done => {
//         const agent = chai.request.agent(app);
//         agent
//           .post('/user/signin')
//           .send({
//             email: 'wonjun@test.com',
//             password: '1234'
//           })
//           .then(function (res) {
//             agent
//               .put('/plans/schedules/put?id=100')
//               .send({
//                 'name': 'aws',
//                 'is_done': false,
//                 'user_id': 1,
//                 'start': '06:00:00',
//                 'end': '23:00:00',
//                 'date': '2020-07-01'
//               })
//               .then(function (res2) {
//                 expect(res2).to.have.status(404);
//                 //expect(res2.body.message).to.equal('cannot found'); //에러핸들링 필요
//                 done();
//               })
//               .catch(err => {
//                 done(err);
//               });
//           });
//       });

//     });

//     //goal 삭제
//     describe('DELETE /plans/schedules/delete/:id', () => {
//       it('자신의 목표를 삭제할 수 있다.', done => {
//         const agent = chai.request.agent(app);
//         agent
//           .post('/user/signin')
//           .send({
//             email: 'wonjun@test.com',
//             password: '1234'
//           })
//           .then(function (res) {
//             agent
//               .delete('/plans/schedules/delete?id=1')
//               .end((err, res) => {
//                 if (err) {
//                   done(err);
//                   return;
//                 }
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).has.equal('success');
//                 done();
//               });
//           });
//       });
      
//       it('삭제', done => {
//         const agent = chai.request.agent(app);
//         agent //선 로그인
//           .post('/user/signin')
//           .send({
//             email: 'wonjun@test.com',
//             password: '1234'
//           })
//           .then(function (res) {
//             agent
//               .get('/plans/schedules/get?date=2020-07-01')
//               .then(function (res2) {
//                 // should get status 200, which indicates req.session existence.
//                 //console.log(res2.status);
//                 console.log('delete');
//                 console.log(res2.body)
                
//                 done();
//               })
//               .catch(err => {
//                 done(err);
//               });
//           });
//       });

//       it('없는 목표나 권한이 없는 목표 삭제 불가', done => {
//         const agent = chai.request.agent(app);

//         agent
//           .post('/user/signin')
//           .send({
//             email: 'wonjun@test.com',
//             password: '1234'
//           })
//           .then(function (res) {
//             agent
//               .delete('/plans/schedules/delete?id=100')
//               .then(function (res2) {
//                 expect(res2).to.have.status(404);
//                 expect(res2.body.message).to.equal('cannot found');
//                 done();
//               })
//               .catch(err => {
//                 done(err);
//               });
//           });
//       });

//     });
//   });
// });
