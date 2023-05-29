const Address = require("../model/Address.model");
const { Addaddress, Getaddress } = require("../controllers/user/Address")
describe("Addaddress", () => {
    test("should create a new address", async () => {
        const req = {
            body:
            {
                shippingAddress1: "patna",
                shippingAddress2: "patna1",
                city: "patna3",
                zip: "847575",
                country: "india",
                status: "pending",
                userId: "63a439b88706f3380aa1f16b"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const saveMock = jest.fn().mockResolvedValue(req.body);
        jest.spyOn(Address.prototype, "save").mockImplementation(saveMock);

        await Addaddress(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ status: 201, message: "address created successfully", bodydata: req.body });
        expect(saveMock).toHaveBeenCalledTimes(1);
    });

    test("should return an error when invalid data is provided", async () => {
        const req = {
            body:
            {
                shippingAddress1: "patna",
                shippingAddress2: "patna1",
                city: "patna3",
                zip: "847575",
                country: "india",
                status: "pending",
                userId: "63a439b88706f3380aa1f16b"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const error = new Error("Validation failed");
        jest.spyOn(Address.prototype, "save").mockRejectedValue(error);

        await Addaddress(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ status: 400, error: error.message, message: "invalid " });
    });
});




describe("Getaddress", () => {
    it("should return all addresses with a status of     200", async () => {
        const mockAddresses = [{ address: "123 Main St" },
        { address: "456 Elm St" }];
        jest.spyOn(Address, "find").mockResolvedValue(mockAddresses);
        const req = {

        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await Getaddress(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            message: "All order get succesfully",
            data: mockAddresses,
        });
    });

    it("should return an error with a status of 500 if an error occurs", async () => {
        jest.spyOn(Address, "find").mockRejectedValue(new Error("Database error"));
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await Getaddress(req, res);


        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            message: "error",
        });
    });
});
