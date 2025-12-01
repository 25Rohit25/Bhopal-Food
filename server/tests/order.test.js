const request = require('supertest');
const { app, server } = require('../server');
const mongoose = require('mongoose');

describe('Order API', () => {

    // Close DB connection after tests
    afterAll(async () => {
        await mongoose.connection.close();
        server.close(); // Close the socket.io server if it started
    });

    it('should reject an empty order (Zod Validation)', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({}); // Empty body

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Validation Error');
    });

    it('should create a valid order', async () => {
        const orderData = {
            customerName: "Test User",
            phone: "9876543210",
            trainNumber: "12345",
            coach: "B1",
            seatNumber: "12",
            items: [
                {
                    menuItem: "64f8a1b2c3d4e5f6a7b8c9d0", // Fake ID
                    name: "Test Food",
                    quantity: 2,
                    price: 100
                }
            ],
            totalAmount: 200
        };

        const res = await request(app)
            .post('/api/orders')
            .send(orderData);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.customerName).toEqual(orderData.customerName);
    });
});
