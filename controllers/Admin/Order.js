const Order = require('../../model/order.model');


const Addorder = async (req, res) => {
    try {
        console.log(req.body)

        let order = new Order(req.body);
        order = await order.save();


        return res.status(200).json({ status: 200, message: "order created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
};

const Getorder = async (req, res) => {
    try {

        const order = await Order.find().sort();

        return res.status(200).json({ status: 200, message: "All order get succesfully", data: order });

        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const Updateorder = async (req, res) => {

    console.log(req.body)
    // let order = new Order(req.body);
    // order = await order.save();
    const data = await Order.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!order) return res.status(500).send({ status: 500, message: "the order with given ID", data: order });

        return res.status(200).json({ status: 200, message: "order updated successfully", data: order });
    }
    else {
        return res.status(500).json({ status: 500, message: "order is not found " });

    }

};
const Deleteorder = async (req, res) => {

    const data = await Order.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const order = await Order.findByIdAndRemove(req.params.id);
        if (!order) return res.status(500).json({ status: 500, message: "the order is not present by id" })
        return res.status(200).json({ status: 200, message: "order Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "order is Deleted " });
    }

};
const Getordersingle = async (req, res) => {
    // console.log("234")
    try {
        const order = await Order.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The order with the given ID", data: order });

        // res.send(blog);
    }
    catch (ex) {
        console.log(ex.message);
        if (!order) return res.status(404).send('the order with the given ID');

    }
};




module.exports = {
    Addorder, Getorder, Updateorder, Deleteorder, Getordersingle
}