const Review = require('../Models/Review');
const Course = require('../Models/Course');
const User = require('../Models/User')
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

test('should reject review with invalid rating', async () => {
  const user = await User.create({ username: 'revUser', email: 'rev@test.com' });
  const course = await Course.create({
    title: 'Test Course',
    description: 'Sample',
    instructor: 'Jane'
  });

  await expect(
    Review.create({ rating: 6, comment: 'Too high', user: user._id, course: course._id })
  ).rejects.toThrow();
});