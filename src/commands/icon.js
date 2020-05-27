
const { Command } = require('discord-akairo')
const Embed = require('../../app/OtakuEmbed')

module.exports = class IconCommand extends Command {
  
  constructor(){
    super( 'icon', {
      ownerOnly: true,
      aliases: [ 'icon' ],
      description: "Change une nouvelle fois l'image des Labs Otaku.",
      channelRestriction: 'guild'
    })
  }
  
  exec( message, args ) {
    this.client.updateGuildIcon()
  }
  
}