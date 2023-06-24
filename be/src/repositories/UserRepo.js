const UserModel = require('../models/User');

class UserRepo {
  static async save(data) {
    return UserModel.create(data);
  }

  static async findUsers() {
    return UserModel.find({}).exec();
  }

  static async findAllUsersWithPagination(skip, limit) {
    return UserModel.find().skip(skip).limit(limit).exec();
  }

  static async findUserById(userId) {
    return UserModel.findById(userId).exec();
  }

  static async findUserByEmail(email) {
    return UserModel.findOne({ email }).exec();
  }

  static async findUsersByEmail(emails) {
    return UserModel.find().where('email').in(emails).exec();
  }

  static async deleteUserByEmail(email) {
    return UserModel.deleteOne({ email }).exec();
  }

  static async deleteUserById(id) {
    return UserModel.deleteOne({ _id: id }).exec();
  }

  static async updateOneById(userId, data) {
    return UserModel.findOneAndUpdate({ _id: userId }, data, { new: true });
  }
}

module.exports = UserRepo;
