
const { Command } = require('discord-akairo')

module.exports = class MavanimesCommand extends Command {

    constructor(){
        super( 'mavanimes', {
            aliases: [ 'mavanimes' ],
            // ownerOnly: true,
            // channelRestriction: 'guild' || 'dm',
            // clientPermissions: ['BAN_MEMBERS'],
            // userPermissions: ['BAN_MEMBERS'],
            // cooldown: 10000,
            // ratelimit: 2,
            // args: [
            //     {
            //         id: 'text',
            //         type: 'string',
            //         default: 'pas de texte'
            //     },
            //     {
            //         id: 'plat',
            //         type: ['nouilles','nems'],
            //         prompt: {
            //             start: 'Vous vouslez des nouilles ou des nems ?',
            //             retry: 'Entrez `nouilles` ou `nems`.'
            //         }
            //     }
            // ]
        })
    }

    exec( message, args ){
        message.util.send('La commande `Mavanimes` fonctionne !\nTestez-la en tapant `' + message.util.prefix + 'mavanimes`')
    }

}