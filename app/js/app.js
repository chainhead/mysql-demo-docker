const path = require('path')
const http = require('http')
const express = require('express')
const bp = require('body-parser')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const demo = require('./demo')
//
function launchServer(config, conn, callback) {
    const app = express()
    demo.connSetup(conn)
    app.use(bp.json())
    app.use(demo.demo)
    //
    var server = http.createServer(app).listen(config.port)
    server.on('error', (e) => {
        logger.error('%s', e)
        return callback(e, null)
    })
    logger.info('Server launched at port %d', config.port)
    return callback(null, null)
}
//
module.exports = {
    launchServer
}