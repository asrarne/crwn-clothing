const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_API_SECRET_KEY);

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});






// //////////////
// const express = require("express");
// const path = require("path");
// // const cors = require('cors');
// const bodyParser = require("body-parser");
// const enforce = require('express-sslify');

// if (process.env.NODE_ENV !== "production") require("dotenv").config();

// const stripe = require("stripe")(process.env.REACT_APP_STRIPE_API_SECRET_KEY);
// // console.log(process.env.REACT_APP_STRIPE_API_SECRET_KEY);
// const app = express();
// const port = process.env.PORT || 4000;

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(enforce.HTTPS({trustProtoHeader: true}));
// app.use(enforce.HTTPS());
// // app.use(cors());

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client/build")));
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

// app.listen(port, (error) => {
//   if (error) throw error;
//   console.log("Server is running on port " + port);
// });

// app.post("/payment", (req, res) => {
//   const body = {
//     source: req.body.token.id,
//     amount: req.body.amount,
//     currency: "inr",
//     // description: `Your total is ${req.body.amount}`,
//   };

//   stripe.charges.create(body, (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       console.log(stripeErr);  
//       res.status(500).send({ error: stripeErr });
//     } else {
//       console.log(stripeRes);  
//       res.status(200).send({ success: stripeRes });
//     }
//   });
// });
