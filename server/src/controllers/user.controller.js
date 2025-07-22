const User = require("../model/user.model");

async function createUser(req, res) {
  const userBody = req.body;

  try {
    if (!userBody) throw Error("User Body not exists!");

    const existingUser = await User.findOne({ email: userBody.email });

    if (existingUser) {
      res.status(409).json({
        success: false,
        result: "User already registered",
      });
      return;
    }

    const user = await User.create(userBody);

    if (user) {
      res.status(201).json({
        success: true,
        result: "user Regsiter successfully",
      });
    }
  } catch (error) {
    let err = error.message || "Something went wrong while creating user";
    res.status(500).json({
      success: false,
      result: err,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw Error("Email and Password are required!");

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({
        success: false,
        error: "User is not regsitered",
      });
    }

    const isMatched = existingUser.password === password;
    if (!isMatched) {
      res.status(401).json({
        success: false,
        error: "Email or Pasword is wrong",
      });
      return;
    }

    res.status(200).json({
      success: true,
      result: "user logged in Successfully",
    });
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      error: error.message,
    });
  }
}

module.exports = { createUser, loginUser };
