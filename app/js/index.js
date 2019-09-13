const process = require('process')
const path = require('path')
//
const moduleLogger = require('./logger')
const MODULE = path.basename(__filename)
const logger = moduleLogger.moduleLogger(MODULE)
//
const init = require('./init')
const connect = require('./connect')
const app = require('./app')
//
logger.info('Starting demo.')
init.validateArgs(process.argv, (err, res) => {
    if (err) {
        process.exit(8)
    } else {
        let serverConfig = res.server
        logger.info('Good configurations. Starting connections and launching server.')
        connect.doConnect(res.db, res.cache, (err, res) => {
            if (err) {
                process.exit(8)
            } else {
                logger.info('Connections completed.')
                app.launchServer(serverConfig, res, (err, res) => {
                    if (err) {
                        process.exit(8)
                    } else {
                        logger.info('READY.')
                    }
                })
            }
        })
    }
})