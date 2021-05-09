'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true })
const app = express();
const compiler = webpack(config);
const models = require('./dbsequelize/models')
const { Op } = require('sequelize');

global.__basedir = __dirname;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

// app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.post('/updateWork', urlencodedParser, function (req, res) {
  console.log(req.body)

  /* let task = models.task.build(
    req.body
  ) */

  models.task.bulkCreate(req.body,{ ignoreDuplicates: true })
  .then(() => {
    res.status(200).send({
      message: "updated",
    });
  })
  //task.save().then(function () { })
  //res.status(200).send("updated")
}) 

app.post('/getAllForAdmin', urlencodedParser, function (req, res) {
  let startDate = req.body.startDate
  let endDate = req.body.endDate
  console.log(startDate)
  console.log(endDate)
  if (startDate == undefined) {
    models.task.findAll().then(function (data) {
      res.end(JSON.stringify(data))
    })
  }
  else {
    models.task.findAll({
      where: {
        updatedDt: {
          [Op.between]: [startDate, endDate]
        }
      }
    }).then(function (data) {
      res.end(JSON.stringify(data))

    })
  }

})

app.get('*', function (req, res) {
  console.log('inside serving request');
  res.sendFile(path.join(__dirname, '/index.html'));
});


app.listen(9500, 'localhost', function (err) {
  if (err) {
    console.log('printing error::::::::::');
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:9500');
});
