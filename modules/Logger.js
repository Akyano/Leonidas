const chalk = require("Chalk");
const moment = require('moment')

class Logger {
    static log(content, type = "log") {
        const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`
        switch (type) {
            case "log":
                return console.log(
                    `${timestamp} ${chalk.black.bgBlue(type.toUpperCase())} ${content} `
                )
            case 'error':
                return console.log(
                    `${timestamp} ${chalk.black.bgRed(type.toUpperCase())} ${content} `
                );
            case "debug": {
                return console.log(
                    `${timestamp} ${chalk.green(type.toUpperCase())} ${content} `
                );
            }
            case "cmd": {
                return console.log(
                    `${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`
                );
            }
            case "ready": {
                return console.log(
                    `${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`
                );
            }
            case "Slash-load": {
                return console.log(
                    `${timestamp} ${chalk.black.bgMagenta(type.toUpperCase())} ${content}`
                );
            }
            case "Eris-load": {
                return console.log(
                    `${timestamp} ${chalk.black.bgMagenta(type.toUpperCase())} ${content}`
                );
            }
            default:
                throw new TypeError(
                    "Le type de logger doit être debug, log, ready, cmd ,Slash-load ,Eris-load ou error."
                );

        }
    }

    static error(content) {
        return this.log(content, 'error')
    }

    static debug(content) {
        return this.log(content, 'debug')
    }

    static cmd(content) {
        return this.log(content, 'cmd')
    }

    static ready(content) {
        return this.log(content, 'ready')
    }

    static slash(content) {
        return this.log(content, 'Slash-load')
    }

    static eris(content) {
        return this.log(content, 'Eris-load')
    }
}

module.exports = Logger;