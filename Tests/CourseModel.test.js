const Course = require('../Models/Course');
const User = require('../Models/User');
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
