
const { Command } = require('discord-akairo')

module.exports = class ClearCommand extends Command {

    constructor(){
        super( 'clear', {
            aliases: [ 'clear' ],
            description: "Efface au maximum 100 messages à la fois.",
            userPermissions: ['MANAGE_MESSAGES'],
            cooldown: 3000,
            args: [
                {
                    id: 'quantity',
                    type: 'number',
                    prompt: {
                        start: 'Combien de message dois-je effacer ?',
                        retry: 'En valeur numérique s\'il vous plait.'
                    }
                }
            ]
        })
    }

    exec( message, args ){
        if(args.quantity > 99) args.quantity = 99
        message.channel.bulkDelete(Math.floor(args.quantity) + 1)
    }

}