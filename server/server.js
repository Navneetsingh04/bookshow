const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// .env
require("dotenv").config();
// db connection
require("./src/db");

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true); // Allow the request
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "1mb" })); //set the limit of data to sending
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Local modules
const { logMiddleware } = require("./src/middlewares");
const userRouter = require("./src/routes/user.route");
const movieRouter = require("./src/routes/movies.route");
const bookingRouter = require("./src/routes/bookings.route");
const emailRouter = require("./src/routes/sendEmail.route");
const authRouter = require("./src/routes/auth.route");
const paymentRouter = require("./src/routes/payment.route");
const adminRouter = require("./src/routes/admin.Routes");
const wishlistRouter = require("./src/routes/wishlist.route");
// middlwares
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("server is Running");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/users", wishlistRouter);
app.use("/api/movies", movieRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/email", emailRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/admin", adminRouter);
// app.use("/reviews", reviewsRouter);

app.listen(process.env.PORT || 4001, () => {
  console.log(`Server is running on port ${process.env.PORT || 4001}`);
});
