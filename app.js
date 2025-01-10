const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
require("./DB/connection");
const cors = require("cors");
const userRoute = require("./Routes/userRoutes");
const postroute = require("./Routes/postRoute");
const PORT = process.env.PORT || 3005;
const path = require("path");
const app = express();

app.use(morgan("dev"));
app.use(cors());
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });
app.use("/api", userRoute);
app.use("/api", postroute);

app.use("/", express.static(path.join(__dirname, "./build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
