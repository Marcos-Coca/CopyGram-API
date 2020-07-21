import app from '../server';
import request from 'supertest';
import fs from 'fs';

import { user } from '../mocks/userMock';
import { postId } from '../mocks/postMock';

let token: string;
describe('Test Auth Routes', () => {
  test('Sig-In Test', (done) => {
    request(app)
      .post('/api/auth/sign-in')
      .auth(user.userName, user.password)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        token = res.body.token;
        done();
      });
  }, 30000);

  test('Unathorized Test', (done) => {
    request(app)
      .get('/api/friendsposts')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(401);
        done();
      });
  });
  test('Unathorized Test', (done) => {
    request(app)
      .get('/api/aioafhfoua')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(404);
        done();
      });
  });
});

describe('Test FriendsPosts Routes', () => {
  const baseUrl = '/api/friendsposts';

  test('Get Following Posts', (done) => {
    request(app)
      .get(baseUrl)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  }, 30000);

  test('Get User Posts', (done) => {
    request(app)
      .get(`${baseUrl}/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  });

  test('Get Liked Posts', (done) => {
    request(app)
      .get(`${baseUrl}/like`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  });

  test('Like Posts', (done) => {
    request(app)
      .post(`${baseUrl}/like/${postId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(204);
        done();
      });
  }, 30000);
});

describe('Test FriendsUser Routes', () => {
  const baseUrl = '/api/friendsUsers';

  test('Search User', (done) => {
    request(app)
      .post(`${baseUrl}/search?userName=m`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  });

  test('Get User Profile', (done) => {
    request(app)
      .get(`${baseUrl}/${user._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Get User Followers', (done) => {
    request(app)
      .get(`${baseUrl}/${user._id}/followers`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  });
  test('Follow User', (done) => {
    request(app)
      .post(`${baseUrl}/${user._id}/follow`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        expect(res.status).toBe(204);
        done();
      });
  });
});
