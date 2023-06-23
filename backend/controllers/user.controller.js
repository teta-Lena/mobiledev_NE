const { User, validation, loginvalidation } = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { hashPassword } = require("../utils/utilities");
const tokenService = require("../services/tokenService");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { error } = validation(req.body);
    if (error)
      return res.status(400).send({
        message: error.details[0].message,
      });

    let count = await User.countDocuments({ role: "admin" });
    if (count)
      return res.status(400).send({ message: "Admin is already created" });

    let { email, phone } = req.body;

    let user = await User.findOne({
      $or: [
        {
          email,
        },
        {
          phone,
        },
      ],
    });

    if (user) {
      const phoneFound = phone == user.phone;
      const emailFound = email == user.email;
      console.log(phoneFound, emailFound);
      return res.status(400).send({
        message: `User with same email or password found`,
      });
    }

    req.body.password = await hashPassword(req.body.password);

    const newUser = new User(req.body);

    const result = await newUser.save();

    return res.status(201).send({
      message: "CREATED",
      data: result,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};
// User login
exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { errors } = loginvalidation(req.body);

    if (errors) {
      return res.status(400).send({ message: errors.message });
    }

    // console.log("Here");
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accesstoken = await tokenService.generateAuthTokens(user);

    return res.status(200).json({ token: accesstoken, user, success: true });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" + error });
  }
};
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user._id,
    });

    console.log(user);

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

// exports.getUsers = async (req, res) => {
//   try {
//     // const filters = {};
//     // const options = {
//     //   limit: req.query.limit || 1,
//     //   page: req.query.page || 1,
//     // };
//     // filters first param
//     // const users = await User.paginate(filters, options);
//     const users = await User.find({});
//     if (users) {
//       res.status(200).json({
//         success: true,
//         users,
//       });
//     } else {
//       console.log("Failed to fetch all users");
//     }
//   } catch (e) {
//     return res.status(500).send({ message: `Error encountered: ${e}` });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { error } = validation(req.body, true);
//     if (error)
//       return res.status(400).send({
//         message: error.details[0].message,
//       });

//     let { email, nationalId, phone } = req.body;

//     let duplicate_user = await User.findOne({
//       _id: {
//         $ne: req.user._id,
//       },
//       $or: [
//         {
//           email: email,
//         },
//         {
//           nationalId: nationalId,
//         },
//         {
//           phone: phone,
//         },
//       ],
//     });

//     if (duplicate_user) {
//       const phoneFound = phone == duplicate_user.phone;
//       const emailFound = email == duplicate_user.email;
//       return res.status(400).send({
//         message: `User with same ${
//           phoneFound ? "phone " : emailFound ? "email " : "nationalId "
//         } arleady exist`,
//       });
//     }

//     const result = await User.findOneAndUpdate(
//       {
//         _id: req.user._id,
//       },
//       req.body,
//       {
//         new: true,
//       }
//     );

//     return res.status(200).send({
//       message: "UPDATED",
//       data: result,
//     });
//   } catch (e) {
//     return res.status(500).send(e.toString().split('"').join(""));
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     const result = await User.findOneAndDelete({
//       _id: req.user._id,
//     });
//     if (!result)
//       return res.status(404).send({
//         message: "User not found",
//       });

//     return res.send({
//       message: "DELETED",
//       data: result,
//     });
//   } catch (e) {
//     return res.status(500).send(e.toString().split('"').join(""));
//   }
// };
