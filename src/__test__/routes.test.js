const app = require('../server');
const request = require('supertest');
const fs = require('fs');

const user = require('../mocks/userMock');
const post = require('../mocks/postMock');

let tokens;
describe('Test Auth Routes', () => {
  test('Sig-In Test', (done) => {
    request(app)
      .post('/api/auth/sign-in')
      .auth(user.Username, user.Password)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        tokens = res.header['set-cookie'];
        done();
      });
  }, 30000);
});

describe('Test FriendsPosts Routes', () => {
  const baseUrl = '/api/friendsposts';

  test('Get Following Posts', (done) => {
    request(app)
      .get(baseUrl)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  test('Get User Posts', (done) => {
    request(app)
      .get(`${baseUrl}/${user.id}`)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  test('Get Liked Posts', (done) => {
    request(app)
      .get(`${baseUrl}/like`)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  test('Like Posts', (done) => {
    request(app)
      .post(`${baseUrl}/like/${post.id}`)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(204);
        done();
      });
  });
});

describe('Test FriendsUser Routes', () => {
  const baseUrl = '/api/friendsUsers';

  test('Search User', (done) => {
    request(app)
      .post(`${baseUrl}/search?userName=m`)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(200);
        done();
      });
  });

  test('Get User Profile', (done) => {
    request(app)
      .get(`${baseUrl}/${user.id}`)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  test('Get User Followers', (done) => {
    request(app)
      .get(`${baseUrl}/${user.id}/followers`)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(200);
        done();
      });
  });
  test('Follow User', (done) => {
    request(app)
      .post(`${baseUrl}/${user.id}/follow`)
      .set('Cookie', tokens)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.statusCode).toBe(204);
        done();
      });
  });
});
