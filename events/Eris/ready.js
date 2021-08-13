module.exports = class {
    constructor(client) {
        this.client = client
    }

    run() {
        this.client.wait(1000);

        this.client.editStatus({
            type: 3,
            name: `${this.client.users.filter((u) => {
                if (!u.bot) {
                    return u;
                }
            }).length} users on ${this.client.guilds.size} guilds. | !help`
        })

        this.client.logger.ready(`${this.client.user.username}#${this.client.user.discriminator} est prêt à espionner ${this.client.users.filter((u) => {
            if (!u.bot) {
                return u;
            }
        }).length} utilisateurs dans ${this.client.guilds.size} serveurs.`)
    }
}