const Profile = require('../Models/Profile');
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

test('should create a profile for a user', async () => {
  const user = await User.create({ username: 'bioUser', email: 'bio@test.com' });
  const profile = await Profile.create({
    user: user._id,
    bio: 'I love coding'
  });
  expect(profile.user).toEqual(user._id);
  expect(profile.bio).toBe('I love coding');
});