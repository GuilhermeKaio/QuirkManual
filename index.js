const getQuirkList = require('./scripts/quirkList.js')
const quirkInfo = require('./scripts/quirkInfos.js')
const twitter = require('./scripts/twitter.js')
const uniqueRandom = require('unique-random')

async function start() {

    const quirkList = await getQuirkList();
    const random = uniqueRandom(1, quirkList.length);
    Info = await quirkInfo(quirkList[random()])
    console.log(Info);
    await twitter(Info)
}

start()