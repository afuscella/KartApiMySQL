/**
 * Module instantiation
 */
module.exports = function(app) {
    /**
     *  http://localhost:3000/kart
     */

    // GET 1.1
    app.get('/kart', function(req, res) {
        connection = app.infra.cf.createDBConnection();
           kartDAO = new app.infra.dao.KartDAO(connection);
        // ok
        kartDAO.getSeasons(function(err, results) {
            if (err) {
                res.status(404);
                res.end("Not found");
            }
            res.status(200);
            res.send(results);
        });
        app.infra.cf.destroy(connection);
    });

    // POST 1.1
    app.post('/kart', function(req, res) {
        
        connection = app.infra.cf.createDBConnection();
           kartDAO = new app.infra.dao.KartDAO(connection),
               raw = req.body;
        
        if (!(raw instanceof Array)) {
            // wrong format of header path
            res.status(400);
            res.end();
        }

        kartDAO.addSeasons(raw, function(err, results) {
            if (err) {
                res.end(err.stack);

            } else {
                res.status(200);
                res.send(results);
            }
        });

    })
}