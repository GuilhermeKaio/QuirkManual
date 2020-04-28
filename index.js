const quirkList = require('./scripts/quirkList.js')
const quirkInfo = require('./scripts/quirkInfos.js')
const twitter = require('./scripts/twitter.js')
const uniqueRandom = require('unique-random')

async function start() {

    quirk = await quirkList()
    console.log(quirk)
    const random = uniqueRandom(0, quirk.length)
    Info = await quirkInfo(quirk[random()])
    await twitter(Info)

}

start()