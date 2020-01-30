
const { Listener } = require('discord-akairo')

exports = class GuildMemberAddListener extends Listener {

    constructor(){
        super( 'guildMemberAdd', {
            emitter: 'client',
            eventName: 'guildMemberAdd'
        })
    }

    exec( member ){
        
    }

}