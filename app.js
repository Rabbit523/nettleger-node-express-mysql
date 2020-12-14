const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/upload', express.static(__dirname + "/upload"));

const userRoutes = require("./app/routes/user.routes");
const customRoutes = require("./app/routes/custom.routes");
const moduleRoutes = require("./app/routes/module.routes");
const sectionRoutes = require("./app/routes/section.routes");
const pageRoutes = require("./app/routes/page.routes");
const treatmentRoutes = require("./app/routes/treatment.routes");

app.use('/api/user', userRoutes);
app.use('/api/custom', customRoutes);
app.use('/api/module', moduleRoutes);
app.use('/api/section', sectionRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/treatment', treatmentRoutes);

// set port, listen for requests
app.listen(process.env.SERVER_PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}.`);
});