"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _user = _interopRequireDefault(require("./routes/api/user"));

var _product = _interopRequireDefault(require("./routes/api/product"));

var _category = _interopRequireDefault(require("./routes/api/category"));

var _braintree = _interopRequireDefault(require("./routes/api/braintree"));

var _order = _interopRequireDefault(require("./routes/api/order"));

var _key = require("./config/key");

var _path = _interopRequireDefault(require("path"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Connect DB

_mongoose["default"].set("useFindAndModify", false);

_mongoose["default"].connect(process.env.MONGODB_URI || _key.keys.db, {
  useNewUrlParser: true
}).then(function () {
  return console.log("MongoDB Connected");
})["catch"](function (err) {
  return console.log(err);
}); // middleware


app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
app.use("/api/users", _user["default"]);
app.use("/api/product", _product["default"]);
app.use("/api/category", _category["default"]);
app.use("/api/braintree", _braintree["default"]);
app.use("/api/order", _order["default"]); // SET UP  HEROKU

if (process.env.NODE_ENV === "production") {
  app.use(_express["default"]["static"]("front_end/build"));
  app.get("*", function (req, res) {
    res.sendFile(_path["default"].resolve(__dirname, "front_end", "build", "index.html"));
  });
} // PORT


var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on PORT ".concat(PORT));
});