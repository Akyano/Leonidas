const {Client, Collection} = require("eris");
const {SlashCreator, GatewayServer} = require('slash-create')
const {botInfo, defaultSettings} = require("./config")
const {promisify} = require('util')
const path = require("path");
const klaw = require('klaw')
const readdir = promisify(require('fs').readdir)

const creator = new SlashCreator({
    applicationID: botInfo.id,
    publicKey: botInfo.public_key,
    token: botInfo.token
})

class Leonidas extends Client {
    constructor(token, options) {
        super(token, options);

        this.commands = new Collection();
        this.aliases = new Collection();

        this.prefix = defaultSettings.prefix
        this.logger = require('./modules/Logger')
        this.wait = promisify(setTimeout)
    }

    loadCommand(commandPath, commandName) {
        try {
            const props = new (require(`${commandPath}${path.sep}${commandName}`))(creator, this)

            this.logger.eris(`Chargement de la command: ${props.help.name}`)

            props.conf.location = commandPath

            if (props.init) {
                props.init(this)
            }

            this.commands.set(commandName, props);

            props.conf.aliases.forEach(alias => {
                this.aliases.set(alias, props)
            })

            return false
        } catch (e) {
            return `Impossible de charger la commande ${commandName}: ${e}`
        }
    }
}


const client = new Leonidas(botInfo.token, {
    getAllUsers: true,
})

const init = async () => {
    klaw('./commands').on('data', item => {
        const cmdFile = path.parse(item.path)
        if (!cmdFile.ext || cmdFile.ext !== '.js') return
        const response = client.loadCommand(cmdFile.dir, `${cmdFile.name}`)

        if (response) client.logger.error(response)
    })

    const erisEvtFiles = await readdir('./events/Eris')
    client.logger.log(`Chargement de ${erisEvtFiles.length} événements Eris.`)
    erisEvtFiles.forEach(file => {
        const eventName = file.split('.')[0]
        client.logger.log(`Chargement de l'événement appartenant a Eris: ${eventName}`)
        const event = new (require(`./events/Eris/${file}`))(client)
        client.on(eventName, (...args) => event.run(...args))
        delete require.cache[require.resolve(`./events/Eris/${file}`)]
    })

    const slashEvtFiles = await readdir('./events/Slash')
    client.logger.log(`Chargement de ${slashEvtFiles.length} événements Slash.`, 'log')
    slashEvtFiles.forEach(file => {
        const eventName = file.split('.')[0]
        client.logger.log(`Chargement de l'événement appartenant a slash: ${eventName}`)
        const event = new (require(`./events/Slash/${file}`))(client)
        creator.on(eventName, (...args) => event.run(...args))
        delete require.cache[require.resolve(`./events/Slash/${file}`)]
    })

    creator
        .withServer(
            new GatewayServer(
                (handler) => client.on('rawWS', (event) => {
                    if (event.t === 'INTERACTION_CREATE') handler(event.d);
                })
            )
        )
        .registerCommandsIn(path.join(__dirname, 'commands'))
        .syncCommands();

    client.connect();
}

init();

module.exports = client;