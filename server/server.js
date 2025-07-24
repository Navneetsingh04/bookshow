const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// .env
require("dotenv").config();
// db connection
require("./src/db");

// Global MiddleWare
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Local modules
const { logMiddleware } = require("./src/middlewares");
const userRouter = require("./src/routes/user.route");
const movieRouter = require("./src/routes/movies.route");

// middlwares
app.use(logMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("Hello From server");
});

app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
// app.use("/bookings", bookingRouter);
// app.use("/reviews", reviewsRouter);

app.listen(process.env.PORT || 4001, () => {
  console.log(`Server is running on port ${process.env.PORT || 4001}`);
});
