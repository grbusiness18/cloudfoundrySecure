const express = require('express');
const passport = require('passport');
const xsenv = require('@sap/xsenv');
const JWTStrategy = require('@sap/xssec').JWTStrategy;
const nrClient = require('node-rest-client').Client

let client = new nrClient()

const app = express();

const services = xsenv.getServices({ uaa:'myuaa2' });

passport.use(new JWTStrategy(services.uaa));

app.use(passport.initialize());
app.use(passport.authenticate('JWT', { session: false }));

app.get('/', function (req, res, next) {
  console.log("Request CF :" + req)

  res.send('Application user: ' + req.user.id);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});
