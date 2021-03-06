'use strict';
/* apirest framework. */
const express = require('express');
/* Morgan is basically a logger, on any requests being made,it generates logs automatically. */
const morgan = require('morgan');
/* CORS is a nodejs package for providing a Connect/Express middleware that can be used to enable CORS with various options. */
const cors = require('cors');
/* The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env . */
const env = require('dotenv').config();

//Settings
/* setting port config */
const port = process.env.PORT || process.env.NODE_PORT || 8080;
/* init express app */
const app = express();
/* ip configs for req */
app.set('trust proxy', true);

//Middlewares
/* config morgan */
app.use(morgan('dev'));
/* parse application/json, basically parse incoming Request Object as a JSON Object  */
app.use(express.json());
/* parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays */
app.use(express.urlencoded({extended:true}));
/* config cors */
app.use(cors());

//Routes files


//Routes Urls


//Test Conection
app.get('/', function (req, res) { res.send('Hello Apirest Template')});

//Server
try{
    module.exports = app.listen(port, function () {
        console.log(`application up and running on port: ${port}`);
    });
}catch (e) {
    console.log(e.message);
}
