const express = require("express");
const app = express();
const PORT = 3100;
require("dotenv").config();
require("./src/config/db");
const cors = require("cors");
const UserAPI = require("./src/routes/user");
const TaskAPI = require("./src/routes/task");

app.use(express.json());
app.use(cors());

// app.use("/", (req, res) => {
//   res.send("Hellow from pooja");
// });

app.use("/auth", UserAPI);
app.use(TaskAPI);

app.listen(PORT, () => {
  console.log("Server started");
});
