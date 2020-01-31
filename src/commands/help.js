
const { Command } = require('discord-akairo')
const Embed = require('../../app/OtakuEmbed')

module.exports = class HelpCommand extends Command {

    constructor(){
        super( 'help', {
            aliases: [ 'help', 'h' ],
            description: 'Affiche une liste des commandes.',
            args: [
                {
                    id: 'command',
                    type: 'commandAlias',
                    default: null
                }
            ]
        })
    }

    exec( message, args ){

        let embed

        if(args.command){

            embed = new Embed( this.client, {
                description: `Détails de la commande \`${args.command.id}\`\n> ${args.command.description || "Pas de description."}`,
                fields: [
                    {
                        name: 'Aliases',
                        value: args.command.aliases.map( alias => {
                            return '`' + alias + '`'
                        }).join(', ') || "Pas d'alias."
                    },
                    {
                        name: 'Arguments',
                        value: args.command.args.map( arg => {
                            let type = 'resolvable'
                            if(typeof arg.type !== 'function') 
                            type = arg.type.toString().replace(/,/g,' \\|| ')
                            const def = arg.default()
                            return `**${arg.id}** : ${type} ${(def || def === null) ? '[*optional*]' : ''}`
                        }).join('\n') || "Pas d'argument définis via Akairo."
                    }
                ]
            })

        }else{

            embed = new Embed( this.client, {
                title: 'Liste des commandes',
                description: this.category.map( command => {
                    return '`' + command.id + '`'
                }).join(', '),
                fields: [ '`*help <command>` pour les détails' ]
            })
    
        }

        message.util.send(embed.shenron)
    }

}