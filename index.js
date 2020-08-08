'use strict';
/* apirest framework. */
const express = require('express');
/* Morgan is basically a logger, on any requests being made,it generates logs automatically. */
const morgan = require('morgan');
/* CORS is a nodejs package for providing a Connect/Express middleware that can be used to enable CORS with various options. */
const cors = require('cors');
/* The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env . */
const env = require('dotenv').config();