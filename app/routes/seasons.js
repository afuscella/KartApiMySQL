/**
 * Module instantiation
 */
module.exports = function(app) {
    /**
     *  http://localhost:3000/kart/{season}
     */

    // GET 1.1
    app.get('/kart/:season', function(req, res) {
        connection = app.infra.cf.createDBConnection();
         seasonDAO = new app.infra.dao.SeasonDAO(connection);

        params = {};
        // path params
        params.id_season = req.params.season;

        if (isNaN(params.id_season)) {
            // wrong format of header path
            res.status(404);
            res.end();
        }

        // ok
        seasonDAO.getSeasonList(params, function(err, results) {
            if (err) {
                res.end(err.stack);

            } else {
                if (results.length === 0) {
                    res.status(404);
                    res.end("Not found");

                } else {
                    res.status(200);
                    res.send(results);
                }
            }
        });
        app.infra.cf.destroy(connection);
    });

    // POST 1.1
    app.post('/kart/:season', function(req, res) {

        connection = app.infra.cf.createDBConnection();
         seasonDAO = new app.infra.dao.SeasonDAO(connection);
               raw = req.body;

        params = {};
        // path params
        params.id_season = req.params.season;

        if (isNaN(params.id_season)) {
            // wrong format of header path
            res.status(404);
            res.end();
        }

        if (!(raw instanceof Array)) {
            // wrong format of header path
            res.status(400);
            res.end();
        }

        // ok
        seasonDAO.addSeasonRoundsList(params, raw, function(err, results) {
            if (err) {
                res.end(err.stack);

            } else {
                res.status(200);
                res.send(results);
            }
        });
    });

    /**
     *  http://localhost:3000/kart/{season}/standings
     */
    app.get('/kart/:season/standings', function(req, res) {
        connection = app.infra.cf.createDBConnection();
         SeasonDAO = new app.infra.dao.SeasonDAO(connection);

        params = {};
        // path params
        params.id_season = req.params.season;

        if (isNaN(params.id_season)) {
            // wrong format of header path
            res.status(404);
            res.end();
        }

        // ok
        SeasonDAO.getSeasonResults(params, function(err, results) {
            if (err) {
                res.end(err.stack);

            } else {
                if (results.length === 0) {
                    res.status(404);
                    res.end("Not found");

                } else {
                    for (var i in results) {
                        results[i].pos = ++i;
                    }
                    res.status(200);
                    res.send(results);
                }
            }
        });
        app.infra.cf.destroy(connection);
    });

    /**
     *  http://localhost:3000/kart/{season}/standings/{pos}
     */
    app.get('/kart/:season/standings/:pos', function(req, res) {
        connection = app.infra.cf.createDBConnection();
          seasonDAO = new app.infra.dao.SeasonDAO(connection);

        params = {};
        // path params
        params.id_season = req.params.season;
              params.pos = req.params.pos - 1;
        // res.setHeader('Content-Type', 'application/json; charset=utf-8');

        if (isNaN(params.id_season)) {
            // wrong format of header path `season`
            res.status(404);
            res.end();
        }

        if (isNaN(params.pos)) {
            // wrong format of header path `pos`
            res.status(404);
            res.end();
        }
        // ok
        seasonDAO.getSeasonPosById(params, function(err, results) {
            if (err) {
                res.end(err.stack);

            } else {
                if (results.length === 0) {
                    res.status(404);
                    res.end("Not found");

                } else {
                    for (var i in results) {
                        results[i].pos = ++i;
                    }
                    res.status(200);
                    res.send(results[params.pos]);
                }
            }
        });
        app.infra.cf.destroy(connection);
    });
}