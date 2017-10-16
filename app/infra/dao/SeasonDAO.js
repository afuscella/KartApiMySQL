/**
 * Class constructor
 */
function SeasonDAO(connection) {
    this._connection = connection;
}

SeasonDAO.prototype.getSeasonList = function(params, callback) {
    console.log("getting rounds by season");
    this._connection.query(
        'SELECT *'
            + ' FROM GetRounds'
            + ' WHERE id_season = ?'
            , [params.id_season], callback);
}

SeasonDAO.prototype.getSeasonResults = function(params, callback) {
    console.log("getting standings by season");
    this._connection.query(
            'SELECT *'
            + ' FROM GetStandings'
            + ' WHERE id_season = ?'
            , [params.id_season], callback);
}

SeasonDAO.prototype.getSeasonPosById = function(params, callback) {
    console.log("getting standings by season");
    this._connection.query(
            'SELECT * '
            + ' FROM GetStandings'
            + ' WHERE id_season = ?'
            , [params.id_season], callback);
}

SeasonDAO.prototype.addSeasonRoundsList = function(params, raw, callback) {
    console.log("add season round(s) list");
    for (var i in raw) {
        raw[i].id_season = params.id_season;
        
        this._connection.query(
            'INSERT INTO Round SET ?'
            , raw[i], callback
        );
    }
}

/**
 * Module instantiation
 */
module.exports = function () {
    return SeasonDAO;
}