const { Command } = require('discord-akairo')
const fs = require('fs').promises

var template = false
fs.readFile( './src/templates/command.js', { encoding: 'utf8' })
    .then( file => {template = file} )
    .catch( console.error )

module.exports = class MakeCommand extends Command {

    constructor(){
        super( 'make', {
            aliases: [ 'make' ],
            ownerOnly: true
        })
    }

    async exec( message ){

        if(!template) return message.util.send('Le template de commande n\'est pas encore chargé.')

        const logs = []

        const names = message.content.replace(message.util.prefix + 'make','').trim().split(/\s+/g)

        for(const name of names){

            const lowerName = name[0].toLowerCase() + name.slice(1)
            const upperName = name[0].toUpperCase() + name.slice(1)

            try{

                await fs.writeFile(
                    `./src/commands/${lowerName}.js`,
                    template
                        .replace(/{{name}}/g,lowerName)
                        .replace(/{{Name}}/g,upperName),
                    { encoding: 'utf8' }
                )

                logs.push(`Success: \`${message.util.prefix + lowerName}\``)

            }catch(err){

                logs.push(`Error: \`${message.util.prefix + lowerName}\` [${err.message}]`)

            }

        }

        this.handler.reloadAll()

        await message.util.send(logs.join('\n'))

    }

}