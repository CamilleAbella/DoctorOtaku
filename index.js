
const { TOKEN } = require('./config.json')
const { AkairoClient: Client } = require('discord-akairo')

const client = new Client({
    ownerID: ['352176756922253321','604686163554467842'],
    commandUtil: true,
    prefix: '*',
    commandDirectory:   './src/commands/',
    inhibitorDirectory: './src/inhibitors/', // pour ignorer
    listenerDirectory:  './src/listeners/',
},{ disableEveryone: true })

client.login( TOKEN )