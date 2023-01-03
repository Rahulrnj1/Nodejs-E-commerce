const Address = require("../../model/Address.model")
const Addaddress = async (req, res) => {
    try {
        console.log(req.body)

        let address = new Address(req.body);
        address = await address.save();


        return res.status(200).json({ status: 200, message: "address created successfully", bodydata: req.body, });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
};

const Getaddress = async (req, res) => {
    try {

        const address = await Address.find().sort();

        return res.status(200).json({ status: 200, message: "All order get succesfully", data: address });

        // console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const Updateaddress = async (req, res) => {

    console.log(req.body)
    // let address = new Address(req.body);
    // address = await address.save();
    const data = await Address.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!address) return res.status(500).send({ status: 500, message: "the address with given ID", data: address });

        return res.status(200).json({ status: 200, message: "address updated successfully", data: address });
    }
    else {
        return res.status(500).json({ status: 500, message: "address is not found " });

    }

};

const Deleteaddress = async (req, res) => {

    const data = await Address.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const address = await Address.findByIdAndRemove(req.params.id);
        if (!address) return res.status(500).json({ status: 500, message: "The address is not present by id" })
        return res.status(200).json({ status: 200, message: "address Deleted successfully" });

    }
    else {
        return res.status(500).json({ status: 500, message: "The address is not present by id" });
    }

};

const Getaddresssingle = async (req, res) => {
    // console.log("234")
    try {
        const address = await Address.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The Address with the given ID", data: address });

        // res.send(address);
    }
    catch (ex) {
        console.log(ex.message);
        if (!order) return res.status(404).send('the Address with the given ID');

    }
};
module.exports = {
    Addaddress, Getaddress, Updateaddress, Deleteaddress, Getaddresssingle

}