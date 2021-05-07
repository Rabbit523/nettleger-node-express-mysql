const multer = require('multer');
const axios = require('axios');
const parseString = require('xml2js').parseString;
const sql = require("../models/db.js");
require("dotenv").config();

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

exports.checkout = async (req, res) => {
  const amount = req.body.amount;
  const currencyCode = req.body.currency ? req.body.currency : 'NOK';

  const order = {
    order: {
      items: [
        {
          reference: '21',
          name: 'testproduct',
          quantity: 2,
          unit: 'kg',
          unitPrice: 111840,
          taxRate: 2500,
          taxAmount: 55920,
          grossTotalAmount: amount,
          netTotalAmount: 223680,
        },
      ],
      amount: amount,
      currency: 'NOK',
      reference: 'Easy Order',
    },
    checkout: {
      url: 'http://localhost:3000',
      termsUrl: 'https://localhost:3000/toc',
      consumerType: {
        supportedTypes: ['B2C', 'B2B'],
        default: 'B2B',
      },
    },
  };

  try {
    const response = await axios.post(
      process.env.NETS_API_URL,
      order,
      {
        headers: {
          Authorization: process.env.NETS_SECRET_KEY,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
      }
    );
    // console.log(response);
    if(response.status == 201) {
      res.send(response.data.paymentId);
    } else {
      res.status(400).send({ message: "Nets Easy payment failed" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Nets Easy payment failed" });
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