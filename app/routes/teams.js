/**
 * Module instantiation
 */
module.exports = function(app) {
    /**
     *  http://localhost:3000/kart/{season}/drivers
     */

    // GET 1.1
    app.get('/kart/:season/teams', function(req, res) {
        connection = app.infra.cf.createDBConnection(),
          teamsDao = new app.infra.dao.TeamsDAO(connection),
         
        params = {};
        // path params
        params.id_season = req.params.season;

        if (isNaN(params.id_season)) {
            // wrong format of header path
            res.status(404);
            res.end();
        }

        // ok
        teamsDao.getTeams(params, function(err, results) {
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
    app.post('/kart/:season/teams', function(req, res) {
        
        connection = app.infra.cf.createDBConnection(),
          teamsDao = new app.infra.dao.TeamsDAO(connection),
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
        teamsDao.addSeasonTeamList(params, raw, function(err, results) {
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
    app.get('/kart/:season/teams/:team', function(req, res) {
        connection = app.infra.cf.createDBConnection(),
          teamsDAO = new app.infra.dao.TeamsDAO(connection),

        params = {};
         // path parameters
        params.id_season = req.params.season;
          params.id_team = req.params.team;

        if (isNaN(params.id_season)) {
            // wrong format of header path `id_season`
            res.status(404);
            res.end();

        } else if (isNaN(params.id_team)) {
            // wrong format of header path `id`
            res.status(404);
            res.end();
        }

        // ok
        teamsDAO.getTeamById(params, function(err, results) {
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

    app.put('/kart/:season/teams/:id', function(req, res) {
        connection = app.infra.cf.createDBConnection(),
          teamsDAO = new app.infra.dao.TeamsDAO(connection),
               raw = req.body;

        params = {};
         // path parameters
        params.id_season = req.params.season;
               params.id = req.params.id;

        if (isNaN(params.id_season)) {
            // wrong format of header path `id_season`
            res.status(404);
            res.end();

        } else if (isNaN(params.id)) {
            // wrong format of header path `id`
            res.status(404);
            res.end();
        }

        // ok
        teamsDAO.updateSeasonTeamById(params, raw, function(err, results) {
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