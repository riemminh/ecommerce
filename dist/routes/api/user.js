"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("../../model/User"));

var _Order = _interopRequireDefault(require("../../model/Order"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ValidatorRegister = _interopRequireDefault(require("../../validator/ValidatorRegister"));

var _loginValidate2 = _interopRequireDefault(require("../../validator/loginValidate"));

var _authHelper = require("../../helper/authHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)(); // @route /api/users/test
// @desc test user router
// @access PUBLIC

router.get("/test", function (req, res) {
  res.json({
    msg: "user work"
  });
}); // @route /api/users/register
// @desc register user
// @access PUBLIC

router.post("/register", function (req, res) {
  var _validatorRegister = (0, _ValidatorRegister["default"])(req.body),
      isValid = _validatorRegister.isValid,
      errors = _validatorRegister.errors;

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    _User["default"].find({
      email: req.body.email
    }).then(function (user) {
      if (user.length > 0) {
        errors.email = "Email da ton tai";
        res.status(400).json(errors);
      } else {
        var newUser = new _User["default"]({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        var hashPassPromise = new Promise(function (resolve, reject) {
          _bcryptjs["default"].genSalt(10, function (err, salt) {
            _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
              if (err) return reject(err);
              resolve(hash);
            });
          });
        });
        hashPassPromise.then(function (hash) {
          newUser.password = hash;
          return newUser.save();
        }).then(function (user) {
          return res.json(user);
        })["catch"](function (err) {
          return res.status(400).json(err);
        });
      }
    })["catch"](function (err) {
      return res.status(400).json(err);
    });
  }
}); // route /api/users/login
// desc login user
// @access PRIVATE

router.post("/login", function (req, res) {
  var _loginValidate = (0, _loginValidate2["default"])(req.body),
      errors = _loginValidate.errors,
      isValid = _loginValidate.isValid;

  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    _User["default"].findOne({
      email: req.body.email
    }).then(function (user) {
      if (!user) {
        errors.email = "User not found";
        res.status(400).json(errors);
      } // check Password


      _bcryptjs["default"].compare(req.body.password, user.password).then(function (isMatch) {
        if (isMatch) {
          var payload = {
            id: user.id,
            role: user.role,
            name: user.name,
            email: user.email
          };

          _jsonwebtoken["default"].sign(payload, "secretOrKey", {
            expiresIn: 3600
          }, function (err, token) {
            res.json({
              token: "Bearer " + token,
              msg: "success"
            });
          });
        } else {
          errors.password = "Password is correct";
          res.status(400).json(errors);
        }
      });
    });
  }
}); // router /api/users/login_token
// @desc test token login
// @access PRIVATE

router.get("/login_token", _authHelper.vetifyToken, _authHelper.isDecodeToken, _authHelper.isCheckAdmin, function (req, res) {
  res.json(req.user);
}); // @route /api/users/update_user/:id_user
// @desc update user
// @access PRIVATE

router.put("/update_user/:id_user", _authHelper.vetifyToken, _authHelper.isDecodeToken, function (req, res) {
  // const { isValid, errors } = validatorRegister(req.body);
  // if (!isValid) {
  //   res.status(400).json(errors);
  // }
  var newUser = req.body;

  _User["default"].findByIdAndUpdate(req.params.id_user, {
    $set: newUser
  }, {
    "new": true
  }).then(function (user) {
    res.json(user);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/users/get_user/:userId
// @desc get user with id
// @access PRIVATE

router.get("/get_user/:userId", _authHelper.vetifyToken, _authHelper.isDecodeToken, function (req, res) {
  _User["default"].findById(req.params.userId).populate("history.productId").then(function (user) {
    res.json(user);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
}); // @route /api/users/get_order/:userId
// @desc get user with id
// @access PRIVATE

router.get("/get_order/:userId", _authHelper.vetifyToken, _authHelper.isDecodeToken, function (req, res) {
  _Order["default"].find({
    user: req.params.userId
  }).populate("user", "name _id address").then(function (user) {
    res.json(user);
  })["catch"](function (err) {
    return res.status(400).json(err);
  });
});
var _default = router;
exports["default"] = _default;