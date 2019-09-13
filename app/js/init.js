const fs = require('fs')
const path = require('path')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const checkConfig = require('./checkConfig')
//
function checkArgs(args, callback) {
    if (args.length < 5) {
        logger.error('Missing arguments for start-up.')
        logger.error('USAGE: index.js mysql-config.json redis-config.json')
        logger.error('Exiting.')
        return callback('err', null)
    } else {
        logger.info('Checking received arguments.')
    }
    //
    if (fs.existsSync(args[2])) {
        logger.info('Checking server configuration %s', args[2])
    } else {
        logger.error('Server configuration file %s not found. Exiting.', args[2])
        return callback('err', null)
    }
    //
    if (fs.existsSync(args[3])) {
        logger.info('Checking database configuration %s', args[3])
    } else {
        logger.error('Database configuration file %s not found. Exiting.', args[3])
        return callback('err', null)
    }
    //
    if (fs.existsSync(args[4])) {
        logger.info('Checking cache configuration %s', args[4])
    } else {
        logger.error('Cache configuration file %s not found. Exiting.', args[4])
        return callback('err', null)
    }
    //
    var configFiles = {
        server: args[2],
        db: args[3],
        cache: args[4]
    }
    return callback(null, configFiles)
}
//
function validateArgs(args, callback) {
    checkArgs(args, (err, res) => {
        if (err) {
            return callback(err, null)
        } else {
            let serverConfigFile = res.server 
            let dbConfigFile = res.db
            let cacheConfigFile = res.cache
            //
            let serverConfig
            let dbConfig
            let cacheConfig
            //
            checkConfig.serverConfiguration(serverConfigFile, (err, res) => {
                if (err) {
                    return callback('err', null)
                } else {
                    serverConfig = res
                    checkConfig.dbConfiguration(dbConfigFile, (err, res) => {
                        if (err) {
                            return callback('err', null)
                        } else {
                            dbConfig = res
                            checkConfig.cacheConfiguration(cacheConfigFile, (err, res) => {
                                if (err) {
                                    return callback('err', null)
                                } else {
                                    cacheConfig = res
                                    return callback(null, {
                                        server: serverConfig,
                                        db: dbConfig,
                                        cache: cacheConfig
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
//
module.exports = { validateArgs }