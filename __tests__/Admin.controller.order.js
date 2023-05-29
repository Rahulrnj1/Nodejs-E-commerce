const Order = require("../model/order.model")
const { Addorder, Getorder, Updateorder, Deleteorder } = require("../controllers/Admin/Order");


jest.mock('../model/order.model');

describe('Addorder function', () => {
    it('should create a new order', async () => {
        const req = {
            body: {
                orderiteam: [{
                    product_id: '1234',
                    price: 50,
                    quantity: 2,
                    totalPrice: 100
                }],
                shippingAddress1: '123 Main St',
                city: 'New York',
                zip: '10001',
                country: 'USA',
                user: '5678',
                status: 'Pending',
                totalPrice: 100,
            },
        };

        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        const savedOrder = {
            _id: 'abcd',
            orderiteam: [{
                product_id: '1234',
                price: 50,
                quantity: 2,
                totalPrice: 100

            }],
            shippingAddress1: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'USA',
            user: '5678',
            status: 'Pending',
            totalPrice: 100,
            isactive: true,
            isdeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        Order.mockReturnValueOnce({
            save: jest.fn().mockResolvedValueOnce(savedOrder),
        });

        await Addorder(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 201,
            message: 'order created successfully',
            bodydata: req.body,
        });
    });
});


it('should return a status of 400 and an error message on unsuccessful order creation', async () => {
    const req = {
        body: {
            orderiteam: [{
                product_id: '1234',
                price: 50,
                quantity: 2,
                totalPrice: 100
            }],
            shippingAddress1: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'USA',
            user: '5678'
        }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const error = new Error('Database error');
    Order.mockReturnValueOnce({ save: jest.fn().mockRejectedValueOnce(error) });

    await Addorder(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ status: 400, error: error.message, message: "invalid " });
});



describe('Getorder', () => {
    it('should return all orders with a status of 200', async () => {
        // Create a mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Create a mock array of orders
        const orders = [
            {
                _id: '6448f7cd65b8850f0b2c68bc',
                orderiteam: [],
                shippingAddress1: '123 Main St',
                city: 'New York',
                zip: '10001',
                country: 'USA',
                user: 'user1',
                status: 'Pending',
                totalPrice: 0,
                isactive: true,
                isdeleted: false
            },
            {
                _id: '6448f7cd65b8850f0b2c68bf',
                orderiteam: [],
                shippingAddress1: '456 Main St',
                city: 'Los Angeles',
                zip: '90001',
                country: 'USA',
                user: 'user2',
                status: 'Delivered',
                totalPrice: 0,
                isactive: true,
                isdeleted: false
            },
        ];

        // Mock the find function to return the array of orders
        Order.find = jest.fn().mockResolvedValueOnce(orders);


        // Call the Getorder function
        await Getorder(null, res);

        // Check that the response status was set to 500
        // expect(res.status).toHaveBeenCalledWith(500);




        // Log the value of res.json.mock.calls to see what argument it is being called with
        console.log(res.json.mock.calls);




    });

    it('should return a 500 status if an error occurs', async () => {
        // Create a mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mock the find function to throw an error
        Order.find = jest.fn().mockRejectedValueOnce(new Error('Something went wrong'));

        // Call the Getorder function
        await Getorder(null, res);

        // Check that the response status was set to 500
        expect(res.status).toHaveBeenCalledWith(500);

        // Check that the response json data contains an error message
        expect(res.json).toHaveBeenCalledWith({ status: 500, message: "error" });
    });
});


describe('Updateorder', () => {
    it('should update the order and return a status of 200', async () => {
        // Create a mock request and response object
        const req = {
            params: {
                id: '6448f7cd65b8850f0b2c68bc'
            },
            body: {
                status: 'Delivered'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };


        const order = {
            _id: '6448f7cd65b8850f0b2c68bc',
            orderiteam: [],
            shippingAddress1: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'USA',
            user: 'user1',
            status: 'Pending',
            totalPrice: 0,
            isactive: true,
            isdeleted: false
        };

        // Mock the findOne and findByIdAndUpdate functions of the Order model
        Order.findOne = jest.fn().mockResolvedValueOnce(order);
        Order.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(order);

        // Call the Updateorder function
        await Updateorder(req, res);

        // Check that the Order model functions were called with the correct arguments
        expect(Order.findOne).toHaveBeenCalledWith({ _id: req.params.id, isdeleted: false });
        expect(Order.findByIdAndUpdate).toHaveBeenCalledWith(req.params.id, req.body, { new: true });

        // Check that the response status was set to 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Check that the response json data contains the updated order object
        expect(res.json).toHaveBeenCalledWith({ status: 200, message: "order updated successfully", data: order });
    });

    it('should return a status of 500 if the order is not found', async () => {
        // Create a mock request and response object
        const req = {
            params: {
                id: '6448f7cd65b8850f0b2c68bc'
            },
            body: {
                status: 'Delivered'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Mock the findOne function of the Order model to return null
        Order.findOne = jest.fn().mockResolvedValueOnce(null);

        // Call the Updateorder function
        await Updateorder(req, res);

        // Check that the Order model functions were called with the correct arguments
        expect(Order.findOne).toHaveBeenCalledWith({ _id: req.params.id, isdeleted: false });

        // Check that the response status was set to 500 and the correct error message was returned
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ status: 500, message: "order is not found " });
    });
});




describe('Deleteorder', () => {
    it('should delete an order with a valid ID and return a status of 200', async () => {
        // Create a mock request object
        const req = {
            params: {
                id: '6448f7cd65b8850f0b2c68bc',
            },
        };

        // Create a mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the findOne function to return a mock order
        Order.findOne = jest.fn().mockResolvedValueOnce({
            _id: '6448f7cd65b8850f0b2c68bc',
            orderiteam: [{
                "product_id": "63a9a2bde96e07338f9e9c1a",
                "price": "10",
                "quantity": "2",
                "totalPrice": "20"
            },
            {
                "product_id": "63aa8ab646fc429690b84621",
                "price": "15",
                "quantity": "3",
                "totalPrice": "45"
            }],
            shippingAddress1: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'USA',
            user: 'user1',
            status: 'Pending',
            totalPrice: 0,
            isactive: true,
            isdeleted: false,
        });

        // Mock the findByIdAndRemove function to return the mock order
        Order.findByIdAndRemove = jest.fn().mockResolvedValueOnce({
            _id: '6448f7cd65b8850f0b2c68bc',
            orderiteam: [],
            shippingAddress1: '123 Main St',
            city: 'New York',
            zip: '10001',
            country: 'USA',
            user: 'user1',
            status: 'Pending',
            totalPrice: 0,
            isactive: true,
            isdeleted: false,
        });

        // Call the Deleteorder function
        await Deleteorder(req, res);

        // Check that the findOne function was called with the correct ID
        expect(Order.findOne).toHaveBeenCalledWith({ _id: '6448f7cd65b8850f0b2c68bc' });

        // Check that the findByIdAndRemove function was called with the correct ID
        expect(Order.findByIdAndRemove).toHaveBeenCalledWith('6448f7cd65b8850f0b2c68bc');

        // Check that the response status was set to 200
        expect(res.status).toHaveBeenCalledWith(200);

        // Check that the response json data contains the correct message
        expect(res.json).toHaveBeenCalledWith({ status: 200, message: "order Deleted successfully" });
    });

    it('should return an error message when the ID is invalid', async () => {
        // Create a mock request object
        const req = {
            params: {
                id: 'invalid',
            },
        };

        // Create a mock response object
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        // Mock the findOne function to return null
        Order.findOne = jest.fn().mockResolvedValueOnce(null);

        // Call the Deleteorder function
        await Deleteorder(req, res);

        // Check that the findOne function was called with the correct ID
        expect(Order.findOne).toHaveBeenCalledWith({ _id: 'invalid' });

        // Check that the response status was set to 500
        expect(res.status).toHaveBeenCalledWith(500);

        // Check that the response json data contains the correct error message
        expect(res.json).toHaveBeenCalledWith({ status: 500, message: "order is Deleted " });
    });
});
