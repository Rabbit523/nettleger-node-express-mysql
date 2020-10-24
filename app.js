const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("upload"));

const userRoutes = require("./app/routes/user.routes");
const customRoutes = require("./app/routes/index");
app.use('/api/user', userRoutes);
app.use('/api/custom', customRoutes);
// set port, listen for requests
app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}.`);
});