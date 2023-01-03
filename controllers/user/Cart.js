const Cart = require('../../model/Cart.model')
const Addcart = async (req, res) => {
    try {
        console.log(req.body)
        let cart = new Cart(req.body);
        const data = await Cart.findOne({ userId: req.body.userId, product_id: req.body.product_id });

        if (data) {
            const cart = await Cart.updateOne({ _id: data._id }, req.body, {
                new: true
            })
            return res.status(200).json({ status: 200, message: "cart created successfully", bodydata: req.body, });
        }
        else {
            cart = await cart.save();

        }

    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
};
const Getcart = async (req, res) => {
    try {

        const cart = await Cart.find().sort();
        // console.log(cart)
        cart.subTotal = cart.map(item => item.totalPrice).reduce((acc, next) => acc + next);
        console.log(cart)
        return res.status(200).json({ status: 200, message: "All cart get succesfully", data: cart });

        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const Updatcart = async (req, res) => {

    console.log(req.body)
    // let cart = new cart(req.body);
    // cart = await cart.save();
    const data = await Cart.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!cart) return res.status(500).send({ status: 500, message: "the cart with given ID", data: cart });

        return res.status(200).json({ status: 200, message: "cart updated successfully", data: cart });
    }
    else {
        return res.status(500).json({ status: 500, message: "cart is not found " });

    }

};
const Deletecart = async (req, res) => {

    const data = await Cart.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const cart = await Cart.findByIdAndRemove(req.params.id);
        if (!cart) return res.status(500).json({ status: 500, message: "the cart is not present by id" })
        return res.status(200).json({ status: 200, message: "cart Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "cart is Deleted " });
    }

};
const Getcartsingle = async (req, res) => {
    // console.log("234")
    try {
        const cart = await Cart.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The Cart with the given ID", data: cart });

        // res.send(blog);
    }
    catch (ex) {
        console.log(ex.message);
        if (!Cart) return res.status(404).send('the Cart with the given ID');

    }
};

module.exports = {
    Addcart, Getcart, Updatcart, Deletecart, Getcartsingle
}