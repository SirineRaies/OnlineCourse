const mongoose = require('mongoose');
const connectDB = require('../Config/DB');
require('dotenv').config();

describe('MongoDB Connection', () => {

  beforeAll(async () => {
    await connectDB(); 
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('should connect to MongoDB successfully', async () => {
    expect(mongoose.connection.readyState).toBe(1); 
  });
});
