import { Router } from "express";
import UserModel from "../../model/User";
import OrderModel from "../../model/Order";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validatorRegister from "../../validator/ValidatorRegister";
import loginValidate from "../../validator/loginValidate";
import {
  vetifyToken,
  isCheckAdmin,
  isDecodeToken
} from "../../helper/authHelper";

const router = Router();

// @route /api/users/test
// @desc test user router
// @access PUBLIC
router.get("/test", (req, res) => {
  res.json({ msg: "user work" });
});

// @route /api/users/register
// @desc register user
// @access PUBLIC
router.post("/register", (req, res) => {
  const { isValid, errors } = validatorRegister(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    UserModel.find({ email: req.body.email })
      .then(user => {
        if (user.length > 0) {
          errors.email = "Email da ton tai";
          res.status(400).json(errors);
        } else {
          let newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });
          const hashPassPromise = new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
              });
            });
          });
          hashPassPromise
            .then(hash => {
              newUser.password = hash;
              return newUser.save();
            })
            .then(user => res.json(user))
            .catch(err => res.status(400).json(err));
        }
      })
      .catch(err => res.status(400).json(err));
  }
});

// route /api/users/login
// desc login user
// @access PRIVATE
router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidate(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    UserModel.findOne({ email: req.body.email }).then(user => {
      if (!user) {
        errors.email = "User not found";
        res.status(400).json(errors);
      }
      // check Password
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email
          };
          jwt.sign(
            payload,
            "secretOrKey",
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                token: "Bearer " + token,
                msg: "success"
              });
            }
          );
        } else {
          errors.password = "Password is correct";
          res.status(400).json(errors);
        }
      });
    });
  }
});

// router /api/users/login_token
// @desc test token login
// @access PRIVATE
router.get(
  "/login_token",
  vetifyToken,
  isDecodeToken,
  isCheckAdmin,
  (req, res) => {
    res.json(req.user);
  }
);

// @route /api/users/update_user/:id_user
// @desc update user
// @access PRIVATE
router.put("/update_user/:id_user", vetifyToken, isDecodeToken, (req, res) => {
  // const { isValid, errors } = validatorRegister(req.body);
  // if (!isValid) {
  //   res.status(400).json(errors);
  // }
  const newUser = req.body;
  UserModel.findByIdAndUpdate(
    req.params.id_user,
    { $set: newUser },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
});

// @route /api/users/get_user/:userId
// @desc get user with id
// @access PRIVATE
router.get("/get_user/:userId", vetifyToken, isDecodeToken, (req, res) => {
  UserModel.findById(req.params.userId)
    .populate("history.productId")
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
});

// @route /api/users/get_order/:userId
// @desc get user with id
// @access PRIVATE
router.get("/get_order/:userId", vetifyToken, isDecodeToken, (req, res) => {
  OrderModel.find({ user: req.params.userId })
    .populate("user", "name _id address")
    .then(user => {
      res.json(user);
    })
    .catch(err => res.status(400).json(err));
});
export default router;
