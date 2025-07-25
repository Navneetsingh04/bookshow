const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const cookies = req.headers.cookie;

    if (!cookies) {
      req.token = null;
      return next();
    }

    const cookieArray = cookies.split(";");
    const authCookie = cookieArray.find((cookie) =>
      cookie.trim().includes(process.env.AUTH_COOKIE)
    );

    if (!authCookie) {
      req.token = null;
      return next();
    }

    const authToken = authCookie.split("=")[1]?.trim();

    if (!authToken) {
      req.token = null;
      return next();
    }

    const payload = jwt.verify(authToken, process.env.JWT_SECRET);
    req.token = payload.userId;
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    req.token = null;
  }

  next();
}

module.exports = authMiddleware;
