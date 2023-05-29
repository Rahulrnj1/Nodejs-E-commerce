// const { userRegister } = require('../controllers/user/user');
// // const bcrypt = require("../comman/config")
// const bcrypt = require('bcryptjs');
// import User from '../model/user.model'
// import { getjwtToken } from "../middleware/jwt"

// const mockRequest = () => {
//     return {
//         body: {
//             name: "Test User",
//             email: "test@gmail.com",
//             password: "12345678"


//         }
//     }
// }

// const mockResponse = () => {
//     return {
//         status: jest.fn().mockReturnThis(),
//         Json: jest.fn().mockReturnThis()

//     };
// };

// const mockUser = {
//     _id: "640ee887206aac21f4703b01",
//     name: "Test User",
//     email: "test@gmail.com",
//     password: "hashedPassword",

// }


// describe('userRegister', () => {
//     it('should user Register', async () => {
//         jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("hashedPassword")
//         jest.spyOn(User, 'create').mockResolvedValueOnce(mockUser)

//         const mockReq = mockRequest()
//         const mockRes = mockResponse()

//         console.log(mockReq, mockRes)

//     })
// })








// const { userRegister } = require('../controllers/user/user');
// const User = require('../model/user.model')
// jest.mock('../model/user.model')
// const bcrypt = require('bcryptjs');
// // jest.mock('bcryptjs', () => ({
// //     bcrypt: jest.fn(() => 'hash password'),
// // }));

// const request = {
//     body: {
//         name: "fake name",
//         email: "fake email",
//         password: "fake password",
//     },
// };
// const response = {
//     status: jest.fn((x) => x),
//     send: jest.fn((x) => x),

// };

// it('should  send a status code of 400 when user already registered', async () => {
//     User.findOne.mockImplementationOnce(() => ({
//         id: "643fd77e92535d2ac362a384",
//         name: "fake_username",
//         email: "fake_email",
//         password: "fake_password"
//     }))
//     await userRegister(request, response);
//     expect(response.status).toHaveBeenCalledWith(400);
//     expect(response.send).toHaveBeenCalledTimes(1);
// })


// it('should send a status code of 201 when new user is created', async () => {


//     User.findOne.mockResolvedValueOnce(undefined);
//     // expect(response.status).toHaveBeenCalledWith(201);
//     User.findOne.mockResolvedValueOnce({
//         id: 1,
//         name: "name", 
//         email: "email", 
//         password: "password"
//     });
//     await userRegister(request, response);
//     // expect(bcrypt).toBeCalledWith('fake_password')
//     // expect(User.create).toHaveBeenCalledWith({
//         // email:"fake email",
//         // password:"hash password"
//     })

// });





const { userRegister, userlogin } = require('../controllers/user/user');
const User = require('../model/user.model')
const jwt = require('../middleware/jwt');
const bcrypt = require('bcryptjs');
const secretkey = "secretkey"
const saltRounds = 10;

describe('userRegister function', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        name: 'rahul',
        email: 'user@gmail.com',
        password: 'password123'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user', async () => {
    const findOneMock = jest.spyOn(User, 'findOne').mockResolvedValue(null);
    const hashMock = jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
    const saveMock = jest.spyOn(User.prototype, 'save').mockResolvedValue({
      _id: '123456',
      name: 'rahul',
      email: 'user@gmail.com'
    });

    await userRegister(req, res);

    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith({ email: 'user@gmail.com' });

    expect(hashMock).toHaveBeenCalledTimes(1);
    expect(hashMock).toHaveBeenCalledWith('password123', saltRounds);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      data: {
        success: true,
        message: 'User register Successfully',
        data: expect.any(Object)
      }
    });

  });

  it('should return an error if user is already registered', async () => {
    const findOneMock = jest.spyOn(User, 'findOne').mockResolvedValue({
      _id: '643fd77e92535d2ac362a384',
      name: 'rahul',
      email: 'user@gmail.com'
    });

    await userRegister(req, res);

    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith({ email: 'user@gmail.com' });

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      data: {
        message: 'user already registered!'
      }
    });
  });
});


jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));


describe('userlogin', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: 'user@gmail.com',
        password: 'password'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return 400 if email is not provided in req.body', async () => {
    req.body.email = undefined;

    await userlogin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email is required' });
  });

  it('should return 404 if user with the provided email is not found', async () => {
    User.findOne = jest.fn().mockResolvedValue(undefined);

    await userlogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should return 401 if provided password is incorrect', async () => {
    User.findOne = jest.fn().mockResolvedValue({
      email: req.body.email,
      password: 'hashedpassword'
    });
    bcrypt.compare = jest.fn().mockResolvedValue(false);

    await userlogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedpassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid login credentials' });
  });

  it('should return 200 with a token if provided email and password are correct', async () => {
    const user = {
      _id: '123456',
      name: 'Test User',
      email: req.body.email,
      password: 'hashedpassword'
    };
    User.findOne = jest.fn().mockResolvedValue(user);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jwt.sign = jest.fn().mockReturnValue('testtoken');

    await userlogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedpassword');
    // expect(jwt.sign).toHaveBeenCalledWith({ user: { _id: user._id, name: user.name, email: user.email } }, 'secretkey');
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith({ message: 'Logged in successfully', token: 'testtoken' });
  });

  it('should return 500 if an error occurs while finding the user', async () => {
    User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

    await userlogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
