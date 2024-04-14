const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.query.token;
  console.log(req.cookies)
  try {
    const user = jwt.verify(token, 'fuelme');
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }

};