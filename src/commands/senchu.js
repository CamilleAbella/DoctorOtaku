
const { Command } = require('discord-akairo')
const Embed = require('../../app/OtakuEmbed')

module.exports = class SenchuCommand extends Command {

    constructor(){
        super( 'senchu', {
            aliases: [ 'senchu' ],
            description: "Description de la commande Senchu.",
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
        message.util.send('La commande `Senchu` fonctionne !\nTestez-la en tapant `' + message.util.prefix + 'senchu`')
    }

}