"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCheckAdmin = exports.isDecodeToken = exports.vetifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var vetifyToken = function vetifyToken(req, res, next) {
  // Get auth header value
  var bearerHeader = req.headers["authorization"]; // Check if bearer is undefined

  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    var bearer = bearerHeader.split(" "); // Get token from array

    var bearerToken = bearer[1]; // Set the token

    req.token = bearerToken; // Next middleware

    next();
  } else {
    res.status(403);
  }
};

exports.vetifyToken = vetifyToken;

var isDecodeToken = function isDecodeToken(req, res, next) {
  _jsonwebtoken["default"].verify(req.token, "secretOrKey", function (err, user) {
    if (err) {
      res.status(403).json(err);
    } else {
      req.user = user;
      next();
    }
  });
};

exports.isDecodeToken = isDecodeToken;

var isCheckAdmin = function isCheckAdmin(req, res, next) {
  if (req.user.role === 1) {
    next();
  } else {
    res.status(403).json({
      errors: "khong phai admin nhe cu!!! kk"
    });
  }
};

exports.isCheckAdmin = isCheckAdmin;