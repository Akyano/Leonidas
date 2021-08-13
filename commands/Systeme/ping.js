const Command = require("../../modules/Command.js");
const client = require("../../main")

module.exports = class Ping extends Command {
    constructor(creator, client) {
        super(creator, client, {
            name: 'ping',
            description: 'get latency',
            category: __dirname.split("\\").pop()
        });

        this.filePath = __filename;

    }

    async run(ctx) {
        try {
            const message = await client.createMessage(ctx.channelID, "Ping!");
            message.delete()
            return `Pong!
Latency Bot: ${message.timestamp - ctx.invokedAt}ms
Latence API: ${Math.round(
                client.shards.get(0).latency
            )}ms`
        } catch (e) {
            client.logger.error(e)
        }
    }

    async runEris(msg, args) {
        try {
            const message = await msg.channel.createMessage("Ping!");
            message.edit(`Pong!
Latency Bot: ${message.timestamp - msg.timestamp}ms
Latence API: ${Math.round(
                this.client.shards.get(0).latency
            )}ms`)
        } catch (e) {
            this.client.logger.error(e)
        }
    }
}