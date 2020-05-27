
const Enmap = require('enmap')
const axios = require('axios')
const { AkairoClient: Client } = require('discord-akairo')

module.exports = class OtakuClient extends Client {

  constructor(...options){
    
    super(...options)
    
    this.db = new Enmap({ name: 'otaku' })

  }

  async updateGuildIcon(){
    const bank = this.channels.get('671818081269579777')
    const images = await Promise.all((await bank.fetchMessages({ limit: 100 }))
      .filter( message => (
        message.attachments.first() &&
        /\.png|jpe?g$/i.test( message.attachments.first().url )
      )).map( message => axios.get( message.attachments.first().url ))
    )
    console.log(images)
  }

  async login( token ){
    await this.db.defer
    this.db.ensure('user_autoroles', [])
    this.db.ensure('bot_autoroles', [])
    // this.db.ensure('last_guild_icon_week_index', 0)
    return super.login(token)
  }

}