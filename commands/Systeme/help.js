const Command = require("../../modules/Command.js");
const utils = require("../../modules/utils.js");
const embedBuilder = require("../../modules/embedBuilder")
const EmbedPaginator = require('../../modules/embedPaginator');

module.exports = class Help extends Command {
    constructor(creator, client) {
        super(creator, client, {
            name: 'help',
            description: 'display help',
            category: __dirname.split("\\").pop() + "."
        });

        this.filePath = __filename;

    }

    async run(ctx) {
        return "Not available for slash command.Try !help to display help"
    }

    async runEris(msg, args) {
        if (!args[0]) {
            const myCommands = this.client.commands.filter(e => {
                    return e.permLevels()
                }
            )

            const sorted = myCommands
                .sort((p, c) =>
                    p.help.category > c.help.category
                        ? 1
                        :
                        p.help.name > c.help.name && p.help.category === c.help.category
                            ? 1
                            : -1
                )

            let embeds = [];

            let category = "";

            let embed;

            for (let i = 0; sorted.length != i; i++) {
                if (category != sorted[i].help.category) {
                    category = sorted[i].help.category
                    if (i === 0) {
                        embed = new embedBuilder()
                            .title(`Help ${category.toLowerCase()}.`)
                            .description(`[Utiliser ${
                                this.client.prefix
                            }help <nom de la commande> pour plus de détails]
Legende : () = parametre requis {} = parametre facultatif\n`)
                            .field(utils.ucfirst(sorted[i].help.name), sorted[i].help.description)
                            .color("#ff00ff")
                            .author(msg.author.username, msg.author.avatarURL)
                    } else {
                        embeds.push(embed.sendable)
                        embed = new embedBuilder()
                            .title(`Help ${category.toLowerCase()}.`)
                            .description(`[Utiliser ${
                                this.client.prefix
                            }help <nom de la commande> pour plus de détails]
Legende : () = parametre requis {} = parametre facultatif\n`)
                            .field(utils.ucfirst(sorted[i].help.name), sorted[i].help.description)
                            .color("#ff00ff")
                            .author(msg.author.username, msg.author.avatarURL)
                    }
                } else {
                    embed.field(utils.ucfirst(sorted[i].help.name), sorted[i].help.description)

                }
            }
            embeds.push(embed.sendable)

            EmbedPaginator.createPaginationEmbed(msg, embeds, {
                cycling: true,
                backButton: "2678redarrowleft:872973529807728700"
            })
        }
    }
}