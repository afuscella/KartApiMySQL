/**
 * MySQL Connection Factory
 */
var mysql = require('mysql');

/**
 * Module instantiation
 */
module.exports = {
    createDBConnection : createDBConnection,
               destroy : destroy
}

/**
 * Create MySQL connection
 * @no params
 */
function createDBConnection() {
    return mysql.createConnection({
        // host: 'db',
        // user: 'root',
        // password: 'docker',
        // database: 'kart'
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'kart'
    })
}

/**
 * Close connnection
 * @connection  
 */
function destroy(connection) {
    connection.end();
}