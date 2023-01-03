const Product = require("../../model/product.model")


const Addproduct = async (req, res) => {
    try {


        // console.log(req.file)
        let fileName = req.file.filename;
        console.log(fileName);

        let product = new Product({ userId: req.params.id, name: req.body.name, title: req.body.title, descriptions: req.body.descriptions, image: fileName, Categoryid: req.body.Categoryid });
        product = await product.save();


        return res.status(200).json({ status: 200, message: "product created successfully", bodydata: req.body, filedata: req.file });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }

};
const Getproduct = async (req, res) => {
    try {

        const product = await Product.find().sort();


        return res.status(200).json({ status: 200, message: "All product get succesfully", data: product });

        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const Getproductcategory = async (req, res) => {
    try {

        const product = await Product.find({ Categoryid: req.params.id }).sort();
        return res.status(200).json({ status: 200, message: "All product get By CategoryId succesfully", data: product });
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const Updateproduct = async (req, res) => {

    console.log(req.userData._id)
    const data = await Product.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const product = await Product.findByIdAndUpdate(req.params.id, { name: req.body.name, title: req.body.title, descriptions: req.body.descriptions }, {
            new: true
        });
        if (!product) return res.status(500).send({ status: 500, message: "the product with given ID", data: product });

        return res.status(200).json({ status: 200, message: "product updated successfully", data: product });
    }
    else {
        return res.status(500).json({ status: 500, message: "product is not found " });

    }

};
const Deleteproduct = async (req, res) => {

    const data = await Product.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) return res.status(500).json({ status: 500, message: "the product is not present by id" })
        return res.status(200).json({ status: 200, message: "product Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "product is Deleted " });
    }

};
const Getproductsingle = async (req, res) => {
    // console.log("234")
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The product with the given ID", data: product });

        // res.send(blog);
    }
    catch (ex) {
        console.log(ex.message);
        if (!Product) return res.status(404).send('The product with the given ID');

    }
};

module.exports = {
    Addproduct, Getproduct, Updateproduct, Deleteproduct, Getproductsingle, Getproductcategory
}