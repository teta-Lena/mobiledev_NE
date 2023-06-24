const PurchasedTokenModel = require("../models/PurchasedToken");

class PurchasedTokenRepo {
  static async save(data) {
    return PurchasedTokenModel.create(data);
  }

  static async findAll() {
    return PurchasedTokenModel.find({}).exec();
  }

  static async findById(id) {
    return PurchasedTokenModel.findById(id);
  }

  static async findByToken(token) {
    return PurchasedTokenModel.findOne({ token });
  }

  static async find(filter) {
    return PurchasedTokenModel.find(filter).exec();
  }

  static async updateById(id, data) {
    return PurchasedTokenModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
  }

  static async deleteById(id) {
    return PurchasedTokenModel.findByIdAndDelete(id);
  }
}

module.exports = PurchasedTokenRepo;
