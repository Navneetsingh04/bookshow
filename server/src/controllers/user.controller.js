const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const userBody = req.body;

  try {
    if (!userBody) throw Error("User Body not exists!");

    const existingUser = await User.findOne({ email: userBody.email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        result: "User already registered",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(userBody.password, salt);
    userBody.password = hashPassword;

    const user = await User.create(userBody);

    if (user) {
      res.status(201).json({
        success: true,
        result: "User registered successfully!",
      });
      return;
    }
    res.status(500).json({
      success: false,
      result: "Something went wrong!",
    });
  } catch (error) {
    console.log({ error });
    let errorMsg = error.message?.split(":")[2]?.split(",")[0];
    res.status(400).json({
      error: errorMsg,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw Error("Email and Password are required!");

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        error: "User is not registered",
      });
    }

    const isMatched = await bcrypt.compare(password, existingUser.password); // true

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        error: "Email or Password is incorrect",
      });
    }

    const payload = {
      userId: existingUser._id.toString(),
    };

    const Auth_Token = jwt.sign(payload, process.env.JWT_SECRET);

    res.cookie(process.env.AUTH_COOKIE, Auth_Token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    return res.status(200).json({
      success: true,
      result: "User logged in successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

async function getLoggedUser(req, res) {
  const userId = req.userId;

  try {
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated - please log in",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      result: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("getLoggedUser error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function logoutUser(req, res) {
  const userId = req.userId;
  try {
    if (userId) {
      res.cookie("auth-token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 0,
      });
      return res
        .status(200)
        .json({ success: true, result: "Logout Successfully!" });
    } else {
      return res
        .status(400)
        .json({ success: false, result: "No user is logged-in" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, result: "Something went wrong!" });
  }
}

module.exports = { createUser, loginUser, getLoggedUser, logoutUser };
