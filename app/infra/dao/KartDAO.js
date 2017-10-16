/**
 * Class constructor
 */
function KartDAO(connection) {
    this._connection = connection;
}

KartDAO.prototype.getSeasons = function(callback) {
    console.log("getting seasons");
    this._connection.query(
        'SELECT * FROM GetSeasons'
        , callback
    );
}

KartDAO.prototype.addSeasons = function(raw, callback) {
    console.log("adding season");
    for (var i in raw) {
        this._connection.query(
            'INSERT INTO Season VALUES (?)'
            , raw[i].id_season, callback
        );
    }
}

/**
 * Module instantiation
 */
module.exports = function () {
    return KartDAO;
}