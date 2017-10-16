/**
 * Class constructor
 */
function DriversDAO(connection) {
    this._connection = connection;
}

DriversDAO.prototype.getDrivers = function(params, callback) {
    console.log("getting drivers by season");
    this._connection.query(
        'SELECT * '
            + ' FROM GetDrivers'
            + ' WHERE id_season = ?'
            , [params.id_season], callback);
}

DriversDAO.prototype.getDriverById = function(params, callback) {
    console.log("getting driver by driver id");
    console.log(params);
    this._connection.query(
        'SELECT * '
            + 'FROM GetDrivers'
            + ' WHERE id_season = ?'
            + '   AND id_driver = ?'
            , [params.id_season, params.id_driver], callback);
}

DriversDAO.prototype.addSeasonDriverList = function(params, raw, callback) {
    console.log("add season driver(s) list");
    for (var i in raw) {
        raw[i].id_season = params.id_season;
        
        this._connection.query(
            'INSERT INTO Driver SET ?'
            , raw[i], callback
        );
    }
}

DriversDAO.prototype.updateSeasonDriverById = function(params, raw, callback) {
    console.log("update season team by id");
        
    this._connection.query(
        'UPDATE Driver SET ?'
            + ' WHERE id_driver = ?'
            + ' AND id_season = ?'
        , [raw, params.id_driver, params.id_season], callback
    );
}

/**
 * Module instantiation
 */
module.exports = function() {
    return DriversDAO;
}