const express = require("express");


const { checkAuth } = require('../middleware/jwt')

const { userloginschema, userregisterschema } = require('../middleware/User.joi')

const { cartschema, updatecartschema } = require('../middleware/Cart.joi')
const { addressschema, Updateaddressschema } = require("../middleware/Address.joi")
const { orderschema } = require('../middleware/Order.joi')

const address_controller = require("../controllers/user/Address");

const user_controller = require("../controllers/user/user");
const cart_controller = require("../controllers/user/Cart")
const order_controller = require("../controllers/Admin/Order")

const router = express.Router();

router.post('/register', userregisterschema, user_controller.userRegister);
router.post('/login', userloginschema, user_controller.userlogin);
router.post('/profile', checkAuth, user_controller.profile);

router.post('/Addcart', cartschema, checkAuth, cart_controller.Addcart);
router.get('/Getcart', checkAuth, cart_controller.Getcart);
router.put('/Updatcart/:id', checkAuth, updatecartschema, cart_controller.Updatcart);
router.delete('/deletecart/:id', checkAuth, cart_controller.Deletecart);
router.get('/Getcartsingle/:id', checkAuth, cart_controller.Getcartsingle);


router.post('/addaddress', addressschema, checkAuth, address_controller.Addaddress);
router.get('/getaddress', checkAuth, address_controller.Getaddress);
router.put('/Updateaddress/:id', checkAuth, Updateaddressschema, address_controller.Updateaddress);
router.delete('/deleteaddress/:id', checkAuth, address_controller.Deleteaddress);
router.get('/getaddresssingle/:id', checkAuth, address_controller.Getaddresssingle);




router.post('/Addorder', checkAuth, orderschema, order_controller.Addorder);

module.exports = router;        