
const { Command } = require('discord-akairo')
const Embed = require('../../app/OtakuEmbed')

module.exports = class AutoroleCommand extends Command {

    constructor(){
        super( 'autorole', {
            ownerOnly: true,
            aliases: [ 'autorole', 'ar' ],
            description: "Gère les rôles que je donne automatiquement aux nouveau membres ou bots",
            channelRestriction: 'guild',
            args: [
                {
                    id: 'action',
                    type: ['add','remove','list'],
                    default: 'add'
                },
                {
                    id: 'type',
                    type: ['user','bot'],
                    default: 'user'
                },
                {
                    id: 'role',
                    type: ( word, message, args ) => {
                        if(args.action === 'list') return true
                        return this.handler.resolver.type('role')( word, message, args )
                    },
                    prompt: {
                        start: 'Veuillez donner un rôle.',
                        retry: 'Veuillez donner un rôle existant.'
                    }
                }
            ]
        })
    }

    exec( message, args ){

        if(args.action === 'list'){

            const embed = new Embed( this.client, {
                title: `**Liste des rôles automatiques pour les ${args.type}s**\n`,
                description: this.client.db.get( args.type + '_autoroles' ).map( id => {
                    const role = message.guild.roles.get(id)
                    if(!role) this.client.db.remove( args.type + '_autoroles', id )
                    return role ? role : `role deleted (${id})`
                }).join(', ')
            })

            return message.util.send(embed.shenron)

        }

        if(args.role){

            const { role } = args

            if(args.action === 'add'){

                this.client.db.push( args.type + '_autoroles', role.id )
                const embed = new Embed( this.client, `Le rôle ${role.name} sera désormais donné aux nouveaux ${args.type}s.`)
                return message.util.send(embed.shenron)

            }else{

                this.client.db.remove( args.type + '_autoroles', role.id )
                const embed = new Embed( this.client, `Le rôle ${role.name} ne sera désormais plus donné aux nouveaux ${args.type}s.`)
                return message.util.send(embed.shenron)

            }
        }

        return message.util.send(`Echec de la commande.`)
    }

}