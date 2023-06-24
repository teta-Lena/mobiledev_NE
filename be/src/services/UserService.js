const UserRepo = require('../repositories/UserRepo');

class UserService {
  static async create(data) {
    return UserRepo.save(data);
  }

  static async getUserById(userId) {
    return UserRepo.findUserById(userId);
  }

  static async getUserByEmail(email) {
    return UserRepo.findUserByEmail(email);
  }


  static async updateUserById(user, data) {
    return UserRepo.updateOneById(user, data);
  }

  static async findAllUsersWithPagination(skip, limit) {
    const users = await UserRepo.findAllUsersWithPagination(skip, limit);
    return users;
  }

  static async deleteUserById(id) {
    return UserRepo.deleteUserById(id);
  }
}

module.exports = UserService;
