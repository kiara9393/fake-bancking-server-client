var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Banking');

var account = require('./routes/account');
var transaction = require('./routes/transaction');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/trans', transaction);
app.use('/', account);


var port = 3001;
app.listen(port, ()=>
{console.log("server start at port:", port)})
module.exports = app;
