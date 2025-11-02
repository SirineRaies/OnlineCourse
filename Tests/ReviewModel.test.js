const Review = require('../Models/Review');
const Course = require('../Models/Course');
const User = require('../Models/User')
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  const uri = process.env.MONGO_URI ;
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
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
