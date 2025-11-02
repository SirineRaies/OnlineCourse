const mongoose = require('mongoose');
const connectDB = require('../Config/DB');
require('dotenv').config();

jest.setTimeout(30000); // Timeout global pour les tests

describe('MongoDB Connection', () => {

  beforeAll(async () => {
    await connectDB(); 
  });

  afterAll(async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  });

  test('should connect to MongoDB successfully', async () => {
    expect(mongoose.connection.readyState).toBe(1); 
  });
});
