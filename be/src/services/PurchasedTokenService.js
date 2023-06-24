const PurchasedTokenRepo = require("../repositories/PurchasedTokenRepo");

class PurchasedTokenService {
  static async save(data) {
    return PurchasedTokenRepo.save(data);
  }

  static async getTokens() {
    return PurchasedTokenRepo.findAll();
  }

  static async getTokenById(id) {
    return PurchasedTokenRepo.findById(id);
  }

  static async getByToken(token) {
    return PurchasedTokenRepo.findByToken(token);
  }

  static async updateById(id, data) {
    return PurchasedTokenRepo.updateById(id, data);
  }
  static async getTokensByMeterNumber(meterNumber) {
    return PurchasedTokenRepo.find({ meter_number: meterNumber });
  }

  static async deleteById(id) {
    return PurchasedTokenRepo.deleteById(id);
  }

  static generateToken(amount) {
    if (amount < 100) {
      throw new Error("Amount should not be less than 100");
    }

    const maxDays = 365 * 5;
    const days = Math.floor(amount / 100);

    // Limiting to a maximum of 5 years (1825 days)
    if (days > maxDays) {
      throw new Error("Amount exceeds maximum allowed for 5 years");
    }

    // Generates a random eight-digit token
    const token = Math.floor(Math.random() * 90000000) + 10000000;

    return {
      token,
      days,
    };
  }
}

module.exports = PurchasedTokenService;
