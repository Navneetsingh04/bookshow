const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const cookies = req.headers.cookie;
  const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE || "auth-token";

  if (!cookies) {
    return res.status(401).json({ error: "No cookies found" });
  }

  const cookieArray = cookies.split(";");
  const authCookie = cookieArray.find(c =>
    c.trim().startsWith(`${AUTH_COOKIE_NAME}=`)
  );

  if (!authCookie) {
    return res.status(401).json({ error: "Auth token not found" });
  }

  const authToken = authCookie.split("=")[1];

  if (!authToken) {
    return res.status(401).json({ error: "Auth token is empty" });
  }

  try {
    const payload = jwt.verify(authToken, process.env.JWT_SECRET);
    req.token = payload.userId; 
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
