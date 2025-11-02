process.env.NODE_ENV = 'test';
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const User = require('../Models/User');
const Course = require('../Models/Course');
const Review = require('../Models/Review');

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
  await User.deleteMany();
  await Course.deleteMany();
  await Review.deleteMany();
});

describe('Courses / Reviews / Enrollment Routes', () => {

  // -------------------- Courses --------------------
  test('POST /api/courses → should create a course', async () => {
    const res = await request(app)
      .post('/api/courses')
      .send({ title: 'Cours 1', description: 'Desc', instructor: 'Prof' });

    expect(res.statusCode).toBe(201);
    expect(res.body.course.title).toBe('Cours 1');
  });

  test('POST /api/courses → fail if missing fields', async () => {
    const res = await request(app)
      .post('/api/courses')
      .send({ title: 'Cours 1' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Veuillez remplir tous les champs/);
  });

  test('GET /api/courses → should return all courses', async () => {
    await Course.create({ title: 'C1', description: 'D1', instructor: 'T1' });
    await Course.create({ title: 'C2', description: 'D2', instructor: 'T2' });

    const res = await request(app).get('/api/courses');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test('GET /api/courses/:id → should return course by ID', async () => {
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });
    const res = await request(app).get(`/api/courses/${course._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('C');
  });

  test('GET /api/courses/:id → fail if course not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/courses/${fakeId}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/Course non trouvé/);
  });

  // -------------------- Reviews --------------------
  test('POST /api/courses/:courseId/reviews → should create review', async () => {
    const user = await User.create({ username: 'u', email: 'u@test.com' });
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });

    const res = await request(app)
      .post(`/api/courses/${course._id}/reviews`)
      .send({ rating: 5, comment: 'Top', user: user._id });

    expect(res.statusCode).toBe(201);
    expect(res.body.review.rating).toBe(5);
  });

  test('POST /api/courses/:courseId/reviews → fail if missing fields', async () => {
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });
    const res = await request(app)
      .post(`/api/courses/${course._id}/reviews`)
      .send({ comment: 'Top' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Veuillez remplir tous les champs requis/);
  });

  test('GET /api/courses/:courseId/reviews → should return all reviews', async () => {
    const user = await User.create({ username: 'u', email: 'u@test.com' });
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });

    await Review.create({ rating: 5, comment: 'Top', course: course._id, user: user._id });

    const res = await request(app).get(`/api/courses/${course._id}/reviews`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].rating).toBe(5);
  });

  test('GET /api/courses/:courseId/reviews → fail if no reviews', async () => {
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });
    const res = await request(app).get(`/api/courses/${course._id}/reviews`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/Aucune review trouvée/);
  });

  // -------------------- Enrollment --------------------
  test('POST /api/courses/:courseId/enroll → should enroll user', async () => {
    const user = await User.create({ username: 'u', email: 'u@test.com' });
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });

    const res = await request(app)
      .post(`/api/courses/${course._id}/enroll`)
      .send({ userId: user._id });

   expect(res.statusCode).toBe(201);
expect(res.body.user.courses).toContain(course._id.toString());
expect(res.body.course.students).toContain(user._id.toString());

  });

  test('POST /api/courses/:courseId/enroll → fail if already enrolled', async () => {
    const user = await User.create({ username: 'u', email: 'u@test.com' });
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });
    user.courses.push(course._id);
    course.students.push(user._id);
    await user.save();
    await course.save();

    const res = await request(app)
      .post(`/api/courses/${course._id}/enroll`)
      .send({ userId: user._id });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/déjà inscrit/);
  });

  test('GET /api/courses/:courseId/students → should return students', async () => {
    const user = await User.create({ username: 'u', email: 'u@test.com' });
    const course = await Course.create({ title: 'C', description: 'D', instructor: 'T' });
    user.courses.push(course._id);
    course.students.push(user._id);
    await user.save();
    await course.save();

    const res = await request(app).get(`/api/courses/${course._id}/students`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].username).toBe('u');
  });

  test('GET /api/courses/:courseId/students → fail if course not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/courses/${fakeId}/students`);
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/Cours non trouvé/);
  });

});
