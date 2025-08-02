const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      req.userId = null;
      return next();
    }

    const cookieArray = cookies.split(";");
    const authCookie = cookieArray.find((cookie) =>
      cookie.trim().includes(process.env.AUTH_COOKIE)
    );

    if (!authCookie) {
      req.userId = null;
      return next();
    }

    const authToken = authCookie.split("=")[1]?.trim();

    if (!authToken) {
      req.userId = null;
      return next();
    }

    const payload = jwt.verify(authToken, process.env.JWT_SECRET);
    req.userId = payload.userId;
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    req.userId = null;
  }

  next();
}

module.exports = authMiddleware;
