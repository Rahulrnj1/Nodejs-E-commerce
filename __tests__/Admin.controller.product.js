const Product = require("../model/product.model");
const { Addproduct } = require("../controllers/Admin/Product");

jest.mock("../model/product.model");

describe("Addproduct function", () => {
    let req;
    let res;
    let product;

    beforeEach(() => {
        req = {
            params: { id: "1234" },
            body: {
                name: "Rahul",
                title: "yaduvas",
                descriptions: "jcsygdudhchiiycc",
                Categoryid: "63a9936e4aea4e781768823f",
            },
            file: { filename: "shopping.web" },

        };
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
        product = new Product({
            userId: "643fd77e92535d2ac362a384",
            name: "Rahul",
            title: "yaduvas",
            descriptions: "jcsygdudhchiiycc",
            Categoryid: "63a9936e4aea4e781768823f",
        });
    });

    it("should create a new product and return 200 status", async () => {
        Product.prototype.save.mockResolvedValueOnce(product);

        await Addproduct(req, res);

        expect(Product.prototype.save).toHaveBeenCalledTimes(1);
        expect(Product).toHaveBeenCalledWith({
            userId: "643fd77e92535d2ac362a384",
            name: "Rahul",
            title: "yaduvas",
            descriptions: "jcsygdudhchiiycc",
            Categoryid: "63a9936e4aea4e781768823f",
        }); 00
        expect(product.save).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            message: "product created successfully",
            bodydata: req.body,
            filedata: req.file,
        });
    });

    it("should return 400 status and error message if an error occurs", async () => {
        const error = new Error("Test Error");
        Product.prototype.save.mockRejectedValueOnce(error);

        await Addproduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 400,
            error: error.message,
            message: "invalid ",
        });
    });
});





