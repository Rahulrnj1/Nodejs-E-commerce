
const supertest = require('supertest');
const app = require('../app');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('../model/category.model');
const Category = require('../model/category.model');

const { Addcategory, category, Updatecategory, Deletecategory, Getcategory } = require('../controllers/Admin/Category');

describe('Addcategory', () => {
  it('should add a category successfully', async () => {
    const req = {
      body: {
        name: 'Electronic',

      },
      file: {
        filename: 'test.jpg'
      }
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.spyOn(Category.prototype, 'save').mockResolvedValueOnce({
      _id: '16440e128662bda8dd6b9e976',
      name: 'Electronic',
      image: 'image_1681973544239.webp'

    });

    await Addcategory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'Category created successfully',
      bodydata: req.body,
      filedata: req.file
    });
  }, 10000);
});


describe('Category Controller', () => {
  describe('get all categories', () => {
    it('should return all categories', async () => {
      const categories = [
        { name: 'phone ', image: "image_1681973544239.webp", isactive: true },
        { name: 'electronic', image: "image_1681973544239.webp", isactive: true },
      ];
      jest.spyOn(Category, 'find').mockResolvedValue(categories);

      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await category(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ data: { message: 'All category get succesfully', data: categories } });
    });
  });
});




describe('Updatecategory', () => {
  it('should update a category successfully', async () => {
    const req = mockRequest({
      params: {
        id: '6440e128662bda8dd6b9e976',
      },
      body: {
        name: 'phonee',
      },
      userData: {
        _id: 'user_id',
      },
    });
    const res = mockResponse();
    const category = new Category({
      _id: '6440e128662bda8dd6b9e976',
      name: 'electronic',
    });
    Category.findOne.mockResolvedValue(category);
    Category.findByIdAndUpdate.mockResolvedValue({
      _id: '6440e128662bda8dd6b9e976',
      name: 'phonee',
    });

    await Updatecategory(req, res);
    // console.log(Updatecategory)
    expect(Category.findOne).toHaveBeenCalledWith({
      _id: '6440e128662bda8dd6b9e976',
      isdeleted: false,
    });
    expect(Category.findByIdAndUpdate).toHaveBeenCalledWith(
      '6440e128662bda8dd6b9e976',
      { name: 'phonee' },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'Category updated successfully',
      data: {
        _id: '6440e128662bda8dd6b9e976',
        name: 'phonee',
      },
    });
  });

  it('should return an error if the category is not found', async () => {
    const req = mockRequest({
      params: {
        id: '6440e128662bda8dd6b9e976',
      },
      body: {
        name: 'phonee',
      },
      userData: {
        _id: '643fd77e92535d2ac362a384',
      },
    });
    const res = mockResponse();
    Category.findOne.mockResolvedValue(null);

    //     await Updatecategory(req, res);

    //     expect(Category.findOne).toHaveBeenCalledWith({
    //       _id: 'category_id',
    //       isdeleted: false,
    //     });
    //     expect(Category.findByIdAndUpdate).toHaveBeenCalled();
    //     expect(res.status).toHaveBeenCalledWith(500);
    //     expect(res.json).toHaveBeenCalledWith({
    //       status: 500,
    //       message: 'category is not found',
    //     });
  });
});




describe('Deletecategory', () => {
  it('should delete a category when given a valid id', async () => {
    const mockCategory = {
      _id: '6440e128662bda8dd6b9e976',
      name: 'Electronic'
    };
    const findOneSpy = jest.spyOn(Category, 'findOne').mockResolvedValue(mockCategory);
    const removeSpy = jest.spyOn(Category, 'findByIdAndRemove').mockResolvedValue(true);

    const req = { params: { id: '6440e128662bda8dd6b9e976' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await Deletecategory(req, res);

    expect(findOneSpy).toHaveBeenCalledWith({ _id: '6440e128662bda8dd6b9e976' });
    expect(removeSpy).toHaveBeenCalledWith('6440e128662bda8dd6b9e976');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ status: 200, message: "Category Deleted successfully" });

    findOneSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it('should return 500 error when given an invalid id', async () => {
    const findOneSpy = jest.spyOn(Category, 'findOne').mockResolvedValue(null);

    const req = { params: { id: 'invalidId' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await Deletecategory(req, res);

    expect(findOneSpy).toHaveBeenCalledWith({ _id: 'invalidId' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: 500, message: "category is Deleted " });

    findOneSpy.mockRestore();
  });

  it('should return 500 error when Category.findByIdAndRemove fails', async () => {
    const mockCategory = {
      _id: '6440e128662bda8dd6b9e976',
      name: 'Electronic'
    };
    const findOneSpy = jest.spyOn(Category, 'findOne').mockResolvedValue(mockCategory);
    const removeSpy = jest.spyOn(Category, 'findByIdAndRemove').mockResolvedValue(false);

    const req = { params: { id: '6440e128662bda8dd6b9e976' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await Deletecategory(req, res);

    expect(findOneSpy).toHaveBeenCalledWith({ _id: '6440e128662bda8dd6b9e976' });
    expect(removeSpy).toHaveBeenCalledWith('6440e128662bda8dd6b9e976');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ status: 500, message: "the category is not present by id" });

    findOneSpy.mockRestore();
    removeSpy.mockRestore();
  });
});




