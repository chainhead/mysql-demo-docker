const mysql = require('mysql')
//
function connect(options, callback) {
    var connection = mysql.createConnection(options)
    connection.connect( (err) => {
        if (err) {
            return callback(err, null)
        }
        return callback(null, connection)
    })
}
//
module.exports = {
    connect
}