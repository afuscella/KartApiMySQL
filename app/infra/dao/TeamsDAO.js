/**
 * Class constructor
 */
function TeamsDAO(connection) {
    this._connection = connection;
}

TeamsDAO.prototype.getTeams = function(params, callback) {
    console.log("getting teams by season");
    this._connection.query(
        'SELECT *'
            + ' FROM GetTeams'
            + ' WHERE id_season = ?'
            + ' ORDER by id_season,'
            + '          id_team ASC'
            , [params.id_season], callback);
}

TeamsDAO.prototype.getTeamById = function(params, callback) {
    console.log("getting drivers by team id");
    console.log(params);
    this._connection.query(
        'SELECT *'
            + ' FROM GetDrivers'
            + ' WHERE id_season = ?'
            + '   AND id_team = ?'
            , [params.id_season, params.id_team], callback);
}

TeamsDAO.prototype.addSeasonTeamList = function(params, raw, callback) {
    console.log("add season team(s) list");
    for (var i in raw) {
        raw[i].id_season = params.id_season;
        
        this._connection.query(
            'INSERT INTO Team SET ?'
            , raw[i], callback
        );
    }
}

TeamsDAO.prototype.updateSeasonTeamById = function(params, raw, callback) {
    console.log("update season team by id");
        
    this._connection.query(
        'UPDATE Team SET ?'
            + ' WHERE id_team = ?'
            + ' AND id_season = ?'
        , [raw, params.id, params.id_season], callback
    );
}

/**
 * Module instantiation
 */
module.exports = function() {
    return TeamsDAO;
}