
const Enmap = require('enmap')
const { AkairoClient: Client } = require('discord-akairo')

module.exports = class OtakuClient extends Client {

    constructor(...options){
        
        super(...options)

        this.db = new Enmap({ name: 'otaku' })

    }

    async login( token ){
        await this.db.defer
        if(!this.db.has('user_autoroles'))  this.db.set('user_autoroles', [])
        if(!this.db.has('bot_autoroles'))   this.db.set('bot_autoroles', [])
        return super.login(token)
    }

}