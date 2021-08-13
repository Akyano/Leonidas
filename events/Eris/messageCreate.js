module.exports = class {
    constructor(client) {
        this.client = client
    }

    async run(msg) {
        if (!msg.content.startsWith(this.client.prefix) || msg.author.bot)
            return;

        const args = msg.content.slice(this.client.prefix.length).split(' ');
        const command = args.shift().toLowerCase();

        const cmd = this.client.commands.get(command) || this.client.aliases.get(commands);

        if (cmd) {
            if (cmd.conf.enabled)
                if (msg.channel.guild) {

                    if (!msg.channel.permissionsOf(this.client.user.id).has("sendMessages"))
                        return this.client.getDMChannel(msg.author.id).then(dm => {
                            dm.createMessage('Error: missing permissions (SEND_MESSAGES)')
                        })
                    if (cmd.permLevels(msg, args))
                        cmd.runEris(msg, args)
                    else
                        msg.channel.createMessage(`${msg.author.mention} You don't have the permission to use this command`)
                } else if (cmd.conf.guildOnly) {
                    msg.channel.createMessage('This command is on guild only')
                } else {

                    cmd.runEris(msg, args)
                }
            else {
                if (msg.channel.guild)

                    if (!msg.channel.permissionsOf(this.client.user.id).has("sendMessages"))
                        return this.client.getDMChannel(msg.author.id).then(dm => {
                            dm.createMessage('Error: missing permissions (SEND_MESSAGES)')
                        })
                msg.channel.createMessage("This commands isn't enabled")
            }
        } else
            return

        this.client.logger.cmd(
            `${msg.author.username}(${msg.author.id} lance la commande ${cmd.help.name})`
        )

    }
}