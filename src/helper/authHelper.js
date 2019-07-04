import jwt from "jsonwebtoken";

export const vetifyToken = (req, res, next) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    res.status(403);
  }
};
export const isDecodeToken = (req, res, next) => {
  jwt.verify(req.token, "secretOrKey", (err, user) => {
    if (err) {
      res.status(403).json(err);
    } else {
      req.user = user;
      next();
    }
  });
};
export const isCheckAdmin = (req, res, next) => {
  if (req.user.role === 1) {
    next();
  } else {
    res.status(403).json({ errors: "khong phai admin nhe cu!!! kk" });
  }
};
