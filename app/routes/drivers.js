/**
 * Module instantiation
 */
module.exports = function(app) {
    /**
     *  http://localhost:3000/kart/{season}/drivers
     */

    // get
    app.get('/kart/:season/drivers', function(req, res) {
        connection = app.infra.cf.createDBConnection(),
        driversDao = new app.infra.dao.DriversDAO(connection),
         
        params = {};
        // path params
        params.id_season = req.params.season;

        if (isNaN(params.id_season)) {
            // wrong format of header path
            res.status(404);
            res.end();
        }

        // ok
        driversDao.getDrivers(params, function(err, results) {
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
    app.post('/kart/:id_season/drivers', function(req, res) {
        
        connection = app.infra.cf.createDBConnection(),
        driversDAO = new app.infra.dao.DriversDAO(connection),
               raw = req.body;
         
        params = {};
        // path params
        params.id_season = req.params.id_season;

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
        driversDAO.addSeasonDriverList(params, raw, function(err, results) {
            if (err) {
                res.end(err.stack);

            } else {
                res.status(200);
                res.send(results);
            }
        });
        app.infra.cf.destroy(connection);
    });

     /**
     *  http://localhost:3000/kart/{season}/drivers/{id}
     */   
    app.get('/kart/:season/drivers/:driver', function(req, res) {
        connection = app.infra.cf.createDBConnection(),
        driversDAO = new app.infra.dao.DriversDAO(connection),

        params = {};
         // path parameters
        params.id_season = req.params.season;
        params.id_driver = req.params.driver;

        if (isNaN(params.id_season)) {
            // wrong format of header path `id_season`
            res.status(404);
            res.end();

        } else if (isNaN(params.id_driver)) {
            // wrong format of header path `id`
            res.status(404);
            res.end();
        }

        // ok
        driversDAO.getDriverById(params, function(err, results) {
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

    app.put('/kart/:season/drivers/:driver', function(req, res) {
        connection = app.infra.cf.createDBConnection(),
        driversDAO = new app.infra.dao.DriversDAO(connection),
               raw = req.body;

        params = {};
         // path parameters
        params.id_season = req.params.season;
        params.id_driver = req.params.driver;

        if (isNaN(params.id_season)) {
            // wrong format of header path `id_season`
            res.status(404);
            res.end();

        } else if (isNaN(params.id_driver)) {
            // wrong format of header path `id`
            res.status(404);
            res.end();
        }

        // ok
        driversDAO.updateSeasonDriverById(params, raw, function(err, results) {
            if (err) {
                res.end(err.stack);

            } else {
                res.status(200);
                res.send(results);
            }
        });
        app.infra.cf.destroy(connection);
    });

}