const User = require('../../model/user.model');
const jwt = require("jsonwebtoken");
const secretkey = "secretkey"

const userRegister = async (req, res) => {
    // console.log(req.body)
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send('user already registered');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    await user.save();
    return res.status(200).json({ data: { success: true, message: "User register Successfully", data: user } });
    // res.send(user);
};

const userlogin = async (req, res) => {

    let user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user) {

        jwt.sign({ user }, secretkey, { expiresIn: '30d' }, (err, token) => {
            // console.log("inside user");
            res.json({
                token
            })
        })
    }
    else {
        return res.status(400).send('invalid ');
    }
};

// router.post("/profile", verifyToken, (req, res) 
const profile = async (req, res) => {


    res.json({
        message: "profile accessed",
        data: req.userData,
        // id: authData.user._id

    })


}




module.exports = {
    userRegister, userlogin, profile
}
