const multer = require('multer');
const axios = require('axios');
const parseString = require('xml2js').parseString;
const sql = require("../models/db.js");

// File upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + file.originalname);
  }
});
const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|svg|SVG)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

exports.fileupload = (req, res) => {
	let upload = multer({ storage: storage, fileFilter: imageFilter }).single('file');

  upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any
      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      // Display uploaded image for user validation
      res.send({
        path: `upload/${req.file.fieldname}-${req.file.originalname}`
      });
  });
};

exports.registerNets = async (req, res) => {
  const merchantId = process.env.NETS_MERCHANT_ID;
  const token = process.env.NETS_TOKEN;
  const orderNumber = req.body.orderNumber;
  const amount = req.body.amount;
  const currencyCode = req.body.currency ? req.body.currency : 'NOK';
  const serviceType = 'C';
  const pan = req.body.pan;
  const expiryDate = req.body.expiryDate;
  const securityCode = req.body.securityCode;

  const url = `https://test.epayment.nets.eu/Netaxept/Register.aspx?merchantId=${merchantId}&token=${token}&orderNumber=${orderNumber}&amount=${amount}&CurrencyCode=${currencyCode}&serviceType=${serviceType}&pan=${pan}&expiryDate=${expiryDate}&securityCode=${securityCode}`;
  const response = await axios.get(url);

  if(response.status == 200) {
    const xml = response.data;
    parseString(xml, {trim: true}, function (err, result) {
      if (err) {
        res.status(400).send({ message: "Netaxept response xml parse failed" });
      }
      if (result.RegisterResponse) {
        res.send({ transactionId: result.RegisterResponse.TransactionId[0] });
      } else if (result.Exception) {
        res.status(400).send({ message: result.Exception.Error[0].Message[0] });
      }
    });
  } else {
    res.status(400).send({ message: "Netaxept register failed" });
  }
};

exports.registerTreatment = (req, res) => {
  sql.connect(error => {
    if (error) return res.status(500).send(error);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();

    sql.query("INSERT INTO customer SET name = ?, email = ?, mobile = ?, birthday = ?, treatment = ?, type = ?, date = ?", [
      req.body.name,
      req.body.email,
      req.body.mobile_number,
      req.body.birthday,
      req.body.treatment,
      req.body.treatmentType,
      dateString
    ],
      function (err, rows) {
        if (err) return res.status(500).send(err);
        return res.send({id: rows.insertId});
      }
    );
  });
}

exports.customers = (req, res) => {
  sql.connect(error => {
    if (error) return res.status(500).send(error);
    console.log("Successfully connected to the database.");
    const d = new Date();
    const dateString = d.toString();

    sql.query("SELECT * FROM customer", function (err, rows) {
        if (err) return res.status(500).send(err);
        return res.send({...rows});
      }
    );
  });
}