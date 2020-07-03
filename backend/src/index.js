require('dotenv').config();

const app = require('./app');
require('./database');

async function main(){
    await app.listen(app.get('port'));
    console.log('Server en puerto '+app.get('port'));
    console.log('localhost:'+app.get('port'));
}

main();
