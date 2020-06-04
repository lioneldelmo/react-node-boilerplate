'use strict';

/**
 * The application entry point.
 *
 * National Aeronautics and Space Administration
 * Ames Research Center
 * Intelligent Systems Division
 *
 * @module server
 *
 * @returns {app / express()}
 */

const fs = require('fs');
const join = require('path').join;
const express = require('express');
const config = require('./config.json');
const port = process.env.PORT || config.app.port || 3000;
const app = express();

/**
 * Expose
 */

module.exports = app;


(() => {
    if (app.get('env') === 'test') return;
    
    // Bootstrap routes
    require('./routes.js')(app);
    require('./apis.js')(app);

    app.listen(port, () => {
        console.log(`APRES app started and now listening on port ${port}. Running with process pid: ${process.pid}`)
    });
})()


process.on('exit', (code) => {
    console.log(`About to exit APRES app: ${code}`);
});

/**
 * Method to handle process exceptions
 *
 * @param  {Error} err The error object describing the exception
 * @return {null}
 */
process.on("uncaughtException", (err) => {
    if (err.code === "ECONNRESET") {
        return null;
    }
    console.log("An uncaught exception occurred", err)
})

// Ignore UNABLE_TO_VERIFY_LEAF_SIGNATURE errors arising from invalid certificates
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
