const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./src/config/db.config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
const PORT = process.env.PORT || 2530;
app.use("/", require("./src/controller/student.controller"));
app.use("/", require("./src/controller/contest.controller"));
app.use("/", require("./src/controller/admin.controller"));
app.listen(PORT, async () => {
  await connect();
  console.log(`Port is listening on ${PORT}`);
});
