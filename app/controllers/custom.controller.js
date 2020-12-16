// File upload
const multer = require('multer');
const axios = require('axios');
const parseString = require('xml2js').parseString;
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
  const merchantId = '12003869'
  const token = 'Nj8?(Mq5c_3F!Jf74k)R'
  const orderNumber = 'T12345'
  const amount = 299 * 100
  const currencyCode = 'EUR'
  const serviceType = 'C'
  const pan = req.body.pan;
  const expiryDate = req.body.expiryDate
  const securityCode = req.body.securityCode

  const response = await axios.get(`https://test.epayment.nets.eu/Netaxept/Register.aspx?merchantId=${merchantId}&token=${token}&orderNumber=${orderNumber}&amount=${amount}&CurrencyCode=${currencyCode}&serviceType=${serviceType}&pan=${pan}&expiryDate=${expiryDate}&securityCode=${securityCode}`);
  if(response.status == 200) {
    const xml = response.data;
    parseString(xml, {trim: true}, function (err, result) {
      if (err) {
        res.status(400).send({
          message: "Netaxept response xml parse failed"
        });
      }
      if (result.RegisterResponse) {
        res.send({
          transactionId: result.RegisterResponse.TransactionId
        });
      } else if (result.Exception) {
        res.status(400).send({
          message: result.Exception.Error[0].Message[0]
        });
      }
    });
  } else {
    res.status(400).send({
      message: "Netaxept register failed"
    });
  }
};
