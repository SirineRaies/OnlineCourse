const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const User = require('../Models/User');
const Profile = require('../Models/Profile');
const Course = require('../Models/Course');
const { ObjectId } = require('mongoose').Types;

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Nettoyer la DB après chaque test
  await User.deleteMany();
  await Profile.deleteMany();
});

describe('User Routes', () => {

  test('POST /api/users → should create a user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'sirine', email: 'sirine@test.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe('sirine');
  });

  test('POST /api/users → should fail if missing fields', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'missingEmail' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/remplir tous les champs/);
  });

  test('GET /api/users → should return all users', async () => {
    await User.create({ username: 'u1', email: 'u1@test.com' });
    await User.create({ username: 'u2', email: 'u2@test.com' });

    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test('GET /api/users/:id → should return user by ID', async () => {
    const user = await User.create({ username: 'u', email: 'u@test.com' });
    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('u');
  });

  test('GET /api/users/:id → should return 404 if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/users/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/non trouvé/);
  });

  // Tests pour Profile
test('POST /api/users/:userId/profile → should create profile', async () => {
  const user = await User.create({ username: 'u', email: 'u@test.com' });
  const res = await request(app)
    .post(`/api/users/${user._id}/profile`)
    .send({ bio: 'Hello', website: 'https://example.com' }); 

  expect(res.statusCode).toBe(201);
  expect(res.body.profile.bio).toBe('Hello');
  expect(res.body.profile.website).toBe('https://example.com');
});

test('POST /api/users/:userId/profile → should fail if profile exists', async () => {
  const user = await User.create({ username: 'u', email: 'u@test.com' });
  await Profile.create({ user: user._id, bio: 'Existing' });

  const res = await request(app)
    .post(`/api/users/${user._id}/profile`)
    .send({ bio: 'New' });

  expect(res.statusCode).toBe(400);
  expect(res.body.message).toMatch(/existe déjà/);
});

test('GET /api/users/:userId/profile → should get profile', async () => {
  const user = await User.create({ username: 'u', email: 'u@test.com' });
  await Profile.create({ user: user._id, bio: 'Bio', website: 'https://bio.com' });

  const res = await request(app).get(`/api/users/${user._id}/profile`);
  expect(res.statusCode).toBe(200);
  expect(res.body.bio).toBe('Bio');
  expect(res.body.website).toBe('https://bio.com');
});

test('GET /api/users/:userId/profile → should fail if profile not found', async () => {
  const user = await User.create({ username: 'u', email: 'u@test.com' });
  const res = await request(app).get(`/api/users/${user._id}/profile`);
  expect(res.statusCode).toBe(404);
  expect(res.body.message).toMatch(/Profil non trouvé/);
});

test('PUT /api/users/:userId/profile → should update profile', async () => {
  const user = await User.create({ username: 'u', email: 'u@test.com' });
  await Profile.create({ user: user._id, bio: 'Old', website: 'https://old.com' });

  const res = await request(app)
    .put(`/api/users/${user._id}/profile`)
    .send({
      bio: 'Updated',
      website: 'https://new.com'
    });

  expect(res.statusCode).toBe(200);
  expect(res.body.profile.bio).toBe('Updated');
  expect(res.body.profile.website).toBe('https://new.com');
});

test('PUT /api/users/:userId/profile → should fail if profile not found', async () => {
  const user = await User.create({ username: 'u', email: 'u@test.com' });
  const res = await request(app)
    .put(`/api/users/${user._id}/profile`)
    .send({ bio: 'Updated' });

  expect(res.statusCode).toBe(404);
  expect(res.body.message).toMatch(/Profil non trouvé/);
});


  test('GET /api/users/:userId/courses → should return user courses', async () => {
    const user = await User.create({ username: 'u', email: 'u@test.com' });
    const course1 = await Course.create({ title: 'Cours 1', description: 'Desc', instructor: 'Teacher' });
    const course2 = await Course.create({ title: 'Cours 2', description: 'Desc', instructor: 'Teacher2' });

    user.courses.push(course1._id, course2._id);
    await user.save();

    const res = await request(app).get(`/api/users/${user._id}/courses`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body.map(c => c.title)).toContain('Cours 1');
    expect(res.body.map(c => c.title)).toContain('Cours 2');
  });

  test('GET /api/users/:userId/courses → should fail if user not found', async () => {
    const fakeId = new ObjectId();
    const res = await request(app).get(`/api/users/${fakeId}/courses`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/Utilisateur non trouvé/);
  });
})