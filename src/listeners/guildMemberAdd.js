
const { Listener } = require('discord-akairo')

module.exports = class GuildMemberAddListener extends Listener {

    constructor(){
        super( 'guildMemberAdd', {
            emitter: 'client',
            eventName: 'guildMemberAdd'
        })
    }

    exec( member ){
        const type = member.user.bot ? 'bot' : 'user'
        const roles = this.client.db.get( type + '_autoroles' ).map( id => {
            const role = message.guild.roles.get(id)
            if(!role) this.client.db.remove( args.type + '_autoroles', id )
            return role
        }).filter( role => !!role )
        for(const role of roles){
            member.addRole(role).catch(console.error)
        }
    }

}