const quirkList = require('./scripts/quirkList.js')


async function start(){
    quirk = await quirkList()
    console.log(quirk);
}

start()