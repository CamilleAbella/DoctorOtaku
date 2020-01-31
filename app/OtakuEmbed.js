
const { RichEmbed } = require('discord.js')

const Shenron = {
    tail: '<:shenron1:672145212872851476>',
    body: '<:shenron2:672145211110981655>',
    hand: '<:shenron3:672145212570599429>',
    head: '<:shenron4:672145212805480498>'
}

Shenron.part = [ Shenron.body, Shenron.hand, Shenron.body ].join('')

module.exports = class OtakuEmbed extends RichEmbed {
    
    constructor( client, options ){ super()

        if(typeof options === 'string')
        options = { description: options }

        if(!options.fields) options.fields = []

        this.setAuthor( options.title || client.user.username, client.user.avatarURL )
        this.setDescription( options.description )
        if(options.fields.length > 0)
        this.addShenron(5)
        options.fields.forEach( field => {
            if(typeof field === 'string')
            this.addField('\u200B', field, true)
            else this.addField( field.name, field.value, field.inline )
        })
        this.setFooter('Made with アAkairo and Enmap. GitHub: CamilleAbella/DoctorOtaku', 'https://avatars3.githubusercontent.com/u/48862924?s=400&v=4')

    }

    getShenron( parts = 3 ){
        const shenron = [ Shenron.tail ]
        for(let i=0; i<parts; i++)
        shenron.push( Shenron.part )
        shenron.push( Shenron.head )
        return shenron.join('')
    }

    addShenron( parts = 3, inline = false ){
        this.addField('\u200B', this.getShenron(parts), inline)
        return this
    }

}