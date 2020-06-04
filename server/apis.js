'use strict';

const config = require('./config.json');
const apiPrefix = config.api.prefix;

module.exports = function (app) {

    app.get(apiPrefix + '/getSampleJsonData', function (req, res) {
        const jsonData = require('./data/sample.json')
        res.json(jsonData);
    })

    /**
     * more APIs here....
     */


    /**
   * Error handling
   */

    app.use(function (err, req, res, next) {
        // error page
        res.status(500).render('500', { error: err.stack });
    });

    // assume 404 since no middleware responded
    app.use(function (req, res) {
        const payload = {
            url: req.originalUrl,
            error: 'Not found'
        };
        if (req.accepts('json')) return res.status(404).json(payload);
        res.status(404).render('404', payload);
    });

};
