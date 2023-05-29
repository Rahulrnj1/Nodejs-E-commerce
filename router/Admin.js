const express = require("express");

const bodyParser = require("body-parser");

const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Category');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage })
const productstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Product');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now()
            + path.extname(file.originalname))
    }

});
const productupload = multer({ storage: productstorage })
const { checkAuth } = require('../middleware/jwt')

const { addcategotyschema, updatecategotyschema } = require('../middleware/Category.joi')
const { updateorderschema } = require('../middleware/Order.joi')
const { addproductschema, updateproductschema } = require('../middleware/Product.joi');

const category_controller = require("../controllers/Admin/Category")
const Product_controller = require("../controllers/Admin/Product")
const order_controller = require("../controllers/Admin/Order")

const router = express.Router();

router.get('/category', checkAuth, category_controller.category);
router.post('/Addcategory', checkAuth, upload.single('image'), addcategotyschema, category_controller.Addcategory);
router.put('/Updatecategory/:id', checkAuth, updatecategotyschema, category_controller.Updatecategory);
router.delete('/Deletecategory/:id', checkAuth, category_controller.Deletecategory);
router.get('/Getcategory/:id', checkAuth, category_controller.Getcategory);

router.post('/Addproduct', checkAuth, productupload.single('image'), addproductschema, Product_controller.Addproduct);
router.get('/Getproduct', checkAuth, Product_controller.Getproduct);
router.put('/Updateproduct/:id', checkAuth, updateproductschema, Product_controller.Updateproduct);
router.delete('/Deleteproduct/:id', checkAuth, Product_controller.Deleteproduct);
router.get('/Getproductsingle/:id', checkAuth, Product_controller.Getproductsingle);
router.get('/Getproductcategory/:id', checkAuth, Product_controller.Getproductcategory);



router.get('/Getorder', checkAuth, order_controller.Getorder);
router.put('/Updateorder/:id', checkAuth, updateorderschema, order_controller.Updateorder);
router.delete('/Deleteorder/:id', checkAuth, order_controller.Deleteorder);
router.get('/Getordersingle/:id', checkAuth, order_controller.Getordersingle);






module.exports = router;        