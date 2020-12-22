var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser');

/**
 * Module instantiation
 */
module.exports = function() {
    var app = express();

    // receive functions which will be applied on `request`
    app.use(bodyParser.json());

    load('routes', { cwd: 'app' })
        .then('infra')
        .then('model') // normalizer
        .into(app);

    return app;
}