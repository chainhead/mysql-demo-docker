const fs = require('fs')
const path = require('path')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
function serverConfiguration(configFile, callback) {
    let config
    try {
        config = JSON.parse(fs.readFileSync(configFile))
    } catch (e) {
        return callback(e,null)
    }
    //
    // TODO: Check for mandatory fields
    //
    logger.info('Server configuration file is valid.')
    return callback(null, config)
}
//
function dbConfiguration(configFile, callback) {
    let config
    try {
        config = JSON.parse(fs.readFileSync(configFile))
    } catch (e) {
        return callback(e,null)
    }
    //
    // TODO: Check for mandatory fields
    //
    logger.info('Database configuration file is valid.')
    return callback(null, config)
}
//
function cacheConfiguration(configFile, callback) {
    let config
    try {
        config = JSON.parse(fs.readFileSync(configFile))
    } catch (e) {
        return callback(e,null)
    }
    //
    // TODO: Check for mandatory fields
    //
    logger.info('Cache configuration file is valid.')
    return callback(null, config)}
//
module.exports = {
    serverConfiguration,
    dbConfiguration,
    cacheConfiguration
}