const Course = require('../Models/Course');
const User = require('../Models/User');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

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

jest.setTimeout(20000);

test('should create course with user reference', async () => {
  const user = await User.create({ username: 'testUser', email: 'user@test.com' });
  const course = await Course.create({
    title: 'Node.js Basics',
    description: 'Learn Node.js',
    instructor: 'John Doe',
    students: [user._id]
  });
  expect(course.title).toBe('Node.js Basics');
  expect(course.students[0]).toEqual(user._id);
});