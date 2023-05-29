const mongoose = require('mongoose');
const Cart = require('../model/Cart.model');
const { Addcart } = require("../controllers/user/Cart");


describe('Addcart function', () => {
    let res;
    const req = {
        body: {
            userId: mongoose.Types.ObjectId(),
            product_id: mongoose.Types.ObjectId(),
            quantity: 1,
            totalPrice: 10,
            price: 10,
        },
    };
    console.log(Addcart)
    beforeEach(() => {
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
    it('should create a new cart if no cart exists for the user and product', async () => {
        jest.spyOn(Cart, 'findOne').mockResolvedValueOnce(null);
        jest.spyOn(Cart.prototype, 'save').mockResolvedValueOnce(req.body);

        await Addcart(req, res);

        setTimeout(() => {
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: 201,
                message: 'cart created successfully',
                bodydata: req.body,
            });
        }, 1000);
    });

    it('should update an existing cart if a cart exists for the user and product', async () => {
        const existingCart = {
            _id: mongoose.Types.ObjectId(),
            userId: req.body.userId,
            product_id: req.body.product_id,
            quantity: 1,
            totalPrice: 10,
            price: 10,
            isactive: true,
            isdeleted: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        jest.spyOn(Cart, 'findOne').mockResolvedValueOnce(existingCart);
        jest.spyOn(Cart, 'updateOne').mockResolvedValueOnce({ nModified: 1 });

        await Addcart(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 201,
            message: 'cart created successfully',
            bodydata: req.body,
        });
        expect(Cart.updateOne).toHaveBeenCalledWith(
            { _id: existingCart._id },
            req.body,
            { new: true }
        );
    });

    it('should return an error if there is an error while finding the cart', async () => {
        const errorMessage = 'Error finding cart';
        jest.spyOn(Cart, 'findOne').mockRejectedValueOnce(new Error(errorMessage));

        await Addcart(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            error: errorMessage,
            message: 'invalid ',
        });
    });

    it('should return an error if there is an error while saving the cart', async () => {
        const errorMessage = 'Error saving cart';
        jest.spyOn(Cart, 'findOne').mockResolvedValueOnce(null);
        jest.spyOn(Cart.prototype, 'save').mockRejectedValueOnce(new Error(errorMessage));

        await Addcart(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            error: errorMessage,
            message: 'invalid ',
        });
    });
});

