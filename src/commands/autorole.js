
const { Command } = require('discord-akairo')

module.exports = class AutoroleCommand extends Command {

    constructor(){
        super( 'autorole', {
            aliases: [ 'autorole', 'ar' ],
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
                        retry: 'Veuillez donner un rôle existant.',
                        retries: 3
                    }
                }
            ]
        })
    }

    exec( message, args ){

        if(args.action === 'list'){

            return message.util.send(`**Liste des rôles automatiques pour les ${args.type}s**\n` +
                this.client.db.get( args.type + '_autoroles' ).map( id => {
                    const role = message.guild.roles.get(id)
                    if(!role) this.client.db.remove( args.type + '_autoroles', id )
                    return role ? role.name : `role deleted (${id})`
                }
            ).join(', '))

        }

        if(args.role){

            const { role } = args

            if(args.action === 'add'){

                this.client.db.push( args.type + '_autoroles', role.id )
                return message.util.send(`Le rôle ${role.name} sera désormais donné aux nouveaux ${args.type}s.`)

            }else{

                this.client.db.remove( args.type + '_autoroles', role.id )
                return message.util.send(`Le rôle ${role.name} ne sera désormais plus donné aux nouveaux ${args.type}s.`)

            }
        }

        return message.util.send(`Echec de la commande.`)
    }

}