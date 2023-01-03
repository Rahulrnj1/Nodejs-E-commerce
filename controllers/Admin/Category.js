const Category = require('../../model/category.model')

const category = async (req, res) => {
    try {
        // await Blog.validate();
        const category = await Category.find().sort();
        // res.send(blog)
        return res.status(200).json({ status: 200, message: "All category get succesfully", data: category });
        // const result = await course.save();
        console.log(result);
    }
    catch (ex) {
        console.log(ex.message);
        return res.status(500).json({ status: 500, message: "error" })
    }

};
const Addcategory = async (req, res) => {
    try {

        console.log(req.file)
        let fileName = req.file.filename;
        console.log(fileName);
        let category = new Category({ name: req.body.name, image: fileName });
        console.log(category);
        category = await category.save();


        return res.status(200).json({ status: 200, message: "Category created successfully", bodydata: req.body, filedata: req.file });
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: error.message, message: "invalid " });

    }
};
const Updatecategory = async (req, res) => {
    // const { error } = validateBlog(req.body);
    // if (error) return res.status(500).send(error.details[0].message);
    console.log(req.userData._id)
    const data = await Category.findOne({ _id: req.params.id, isdeleted: false })
    if (data) {
        const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
            new: true
        });
        if (!category) return res.status(500).send({ status: 500, message: "the category with given ID", data: category });

        return res.status(200).json({ status: 200, message: "Category updated successfully", data: category });
    }
    else {
        return res.status(500).json({ status: 500, message: "category is not found " });

    }

};
const Deletecategory = async (req, res) => {

    const data = await Category.findOne({ _id: req.params.id })
    console.log(data)
    if (data) {
        const category = await Category.findByIdAndRemove(req.params.id);
        if (!category) return res.status(500).json({ status: 500, message: "the category is not present by id" })
        return res.status(200).json({ status: 200, message: "Category Deleted successfully" });

        // res.send(blog)
    }
    else {
        return res.status(500).json({ status: 500, message: "category is Deleted " });
    }

};
const Getcategory = async (req, res) => {
    // console.log("234")
    try {
        const category = await Category.findById(req.params.id);
        return res.status(200).json({ status: 200, message: "The category with the given ID", data: category });

        // res.send(blog);
    }
    catch (ex) {
        console.log(ex.message);
        if (!category) return res.status(404).send('the category with the given ID');

    }
};


module.exports = {
    category, Addcategory, Updatecategory, Deletecategory, Getcategory
}
