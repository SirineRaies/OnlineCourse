const Profile = require('../Models/Profile');
const User = require('../Models/User');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  const uri = process.env.MONGO_URI;
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

test('should create a profile for a user', async () => {
  const user = await User.create({ username: 'bioUser', email: 'bio@test.com' });
  const profile = await Profile.create({
    user: user._id,
    bio: 'I love coding'
  });
  expect(profile.user).toEqual(user._id);
  expect(profile.bio).toBe('I love coding');
});
