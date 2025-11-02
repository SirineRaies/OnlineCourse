const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../Models/User');

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

describe('User Model Test', () => {

  it('should create a user successfully', async () => {
    const userData = {
      username: 'sirine',
      email: 'sirine@example.com'
    };

    const user = await User.create(userData);

    expect(user.username).toBe('sirine');
    expect(user.email).toBe('sirine@example.com');
  });

  it('should fail without email', async () => {
    const userData = { username: 'noemail' };
    let err;
    try {
      await User.create(userData);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('should reject invalid email format', async () => {
    const userData = {
      username: 'invalidmail',
      email: 'invalidEmail'
    };

    await expect(User.create(userData)).rejects.toThrow();
  });

});
