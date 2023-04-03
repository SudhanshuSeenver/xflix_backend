const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config");

const PORT = config.PORT;
const MONGODB_URL = config.MONGODB_URL;

let server = app;

server.listen(PORT, () => {
  console.log("Litening at port", PORT);
});

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("connected to DB at", MONGODB_URL))
  .catch((err) => console.log("Error\n", err));
