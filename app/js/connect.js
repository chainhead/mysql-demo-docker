const path = require('path')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const db = require('./db')
//
function connectDb(config, callback) {
    // C001
    db.connect(config, (err, res) => {
        if (err) {
            logger.error('C001 - Code: %s Number: %d SQLSTATE: %s Message: %s', err.code, err.errno, err.sqlState, err.sqlMessage)
            return callback(err, null)
        } else {
            logger.info('C001 - Connected. Connection id %d', res.threadId)
            return callback(null, res)
        }
    })
}
//
function connectCache(config, callback) {
    logger.info('Cache connected successfully.')
    return callback(null, null)
}
//
function doConnect(dbConfig, cacheConfig, callback) {
    let dbConn
    let cacheConn
    //
    connectDb(dbConfig, (err, res) => {
        if (err) {
            return callback('err', null)
        } else {
            dbConn = res
            connectCache(cacheConfig, (err, res) => {
                if (err) {
                    return callback('err', null)
                } else {
                    cacheConn = res
                    return callback(null, {
                        dbConn: dbConn,
                        cacheConn: cacheConn
                    })
                }
            })
        }
    })
}
module.exports = { doConnect }