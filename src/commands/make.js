const { Command } = require('discord-akairo')
const fs = require('fs').promises
var template = false
fs.readFile( './src/templates/command', { encoding: 'utf8' })
    .then( file => {template = file} )
    .catch( console.error )

exports = class MakeCommand extends Command {

    constructor(){
        super( 'make', {
            aliases: [ 'make' ],
            ownerOnly: true,
            args: [
                {
                    id: 'name',
                    type: 'string',
                    default: 'newCommand'
                }
            ]
        })
    }

    exec( message, args ){

        console.log('make command works')

        if(!template) return message.util.send('Le template de commande n\'est pas encore chargé.')

        const name = args.name[0].toLowerCase() + args.name.slice(1)
        const Name = args.name[0].toUpperCase() + args.name.slice(1)

        fs.writeFile(
            `./src/commands/${name}.js`, 
            template
                .replace(/{{name}}/g,name)
                .replace(/{{Name}}/g,Name),
            { encoding: 'utf8' }
        )
            .then( async () => {
                this.client.commandHandler.reload(name)
                message.util.send(`La commande \`${message.util.prefix + name}\` a bien été créée.`)
            })
            .catch( err => {
                message.util.send(err.message)
            })
    }

}