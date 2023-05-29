const request = require('supertest');
const database = require('../index');
const mongoose = require('mongoose');

describe('Database Connection', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to the database', async () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});

