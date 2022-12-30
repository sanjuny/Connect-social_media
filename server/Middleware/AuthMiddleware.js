const jwt = require("jsonwebtoken");
const { checkBlock } = require("../Controller/Admincontroller");

const check = async (req, res, next) => {

  console.log("checked");
  console.log(req.headers.accesstoken, "popopopo");

  try {
    let token = req.headers.accesstoken;
    if (token) {
    }
    const user = jwt.verify(token, process.env.JWT_SECERT);

    if (user) {
      req.user = user;
      next();
    } else {
      res.send({ status: "errors", data: "no user" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "errors", data: error.message });
  }
};

module.exports = check;