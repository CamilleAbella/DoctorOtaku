
const { TOKEN } = require('./config.json')
const OtakuClient = require('./app/OtakuClient')

const client = new OtakuClient({
    ownerID: ['352176756922253321','604686163554467842'],
    commandUtil: true,
    prefix: '*',
    commandDirectory:   './src/commands/',
    inhibitorDirectory: './src/inhibitors/', // pour ignorer
    listenerDirectory:  './src/listeners/',
},{ disableEveryone: true })

client.login( TOKEN )
    .then( done => console.log('Ready') )
    .catch( err => console.error(err.message) )