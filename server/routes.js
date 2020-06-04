'use strict';

/**
 * Module dependencies.
 */

const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */

module.exports = function (app) {
    // Compression middleware (should be placed before express.static)
    app.use(compression({ threshold: 512 }));

    // Static files middleware
    app.use(express.static(__dirname + '/public'))

    // bodyParser should be above methodOverride
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // CookieParser should be above session
    app.use(cookieParser());
   
    if (env === 'development') {
        app.locals.pretty = true;
    }
    if (env === 'production') {
        app.get('/', function(req, res) {
            res.sendFile(__dirname + '/public/index.html')
        })
    }
};
