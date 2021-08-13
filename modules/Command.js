const {SlashCommand} = require('slash-create')

module.exports = class Command extends SlashCommand {
    constructor(creator, client, {
        name = '',
        description = '',
        aliases = [],
        category = '',
        enabled = true,
        usage = '',
        guildOnly = false,
        permissions = {},
        options = []

    }) {
        super(creator, {
            name: name,
            description: description,
            aliases: aliases,
            category: category,
            enabled: enabled,
            usage: usage,
            guildOnly: guildOnly,
            permissions: permissions,
            options: options
        });

        this.client = client;
        this.conf = {enabled, guildOnly, aliases};
        this.help = {name, description, category, usage, options};

    }

    permLevels(msg, args) {
        return true;
    }

}