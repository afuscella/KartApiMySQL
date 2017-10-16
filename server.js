/**
 * Kart Api
 * 
 * DB: MySQl
 * 
 */
var hostname = 'localhost',
         app = require('./config/express')();

// auto environment detection
let env = process.env.NODE_ENV;
if (!env) {
    env = "development"
}

// port and database configs
let config = require(`./config/config.${env}.json`);

// configure port according to environment variable, or uses por 3000 
const port = process.env.port || 3000;

app.listen(port, function() {
    console.log("Server is up and running on http://"
        + hostname
        + ":"
        + port
    );
});