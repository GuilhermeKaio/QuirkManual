const puppeteer = require('puppeteer')
const cutString = require('./cutString.js')

async function start(quirk) {
    name = nameTranslate(quirk)
    urlImg = await getImage(name)
    await sleep(2000)
    type = await getType(name)
    await sleep(2000)
    desc = await getDesc(name)
    await sleep(2000)
    Info = [urlImg, type, desc[0], desc[1]]
    Info = cutString(Info, quirk)
    return Info
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function nameTranslate(name) {
    name = name.split(' ').join('_')
    console.log(name)
    return name
}

async function getImage(name) {
    let scrape = async () => {
        const browser = await puppeteer.launch({ headless: true, args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0)
        await page.goto(`https://bokunoheroacademia.fandom.com/wiki/${name}`)

        const result = await page.evaluate(() => {
            let data = [];
            let elements = document.getElementsByClassName('pi-image-thumbnail')
            for (var element of elements) {
                data.push(element.getAttribute('src'))
            }
            return data
        })

        browser.close()
        return result
    }
    url = ''
    await scrape().then((value) => {
        url = value[0]
        console.log(url);

    })
    return url
}

async function getType(name) {
    let scrape = async () => {
        const browser = await puppeteer.launch({ headless: true, args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0)
        await page.goto(`https://bokunoheroacademia.fandom.com/wiki/${name}`)

        const result = await page.evaluate(() => {
            const types = []
            document.querySelectorAll('div > section > div > header > div > div > div > a')
                .forEach(type => types.push(type.textContent))
            return types
        })


        browser.close()
        return result
    }
    type = []
    await scrape().then((value) => {
        type = value
    })

    if (type[1] == 'Quirks') {
        return type[2]
    }
    else {
        return type[1]
    }
}

async function getDesc(name) {
    let scrape = async () => {
        const browser = await puppeteer.launch({ headless: true, args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0)
        await page.goto(`https://bokunoheroacademia.fandom.com/wiki/${name}`)

        const result = await page.evaluate(() => {
            const types = []
            document.querySelectorAll('div > section > div > article > div > div > div > p')
                .forEach(type => types.push(type.textContent))
            return types
        })


        browser.close()
        return result
    }
    desc = ''
    await scrape().then((value) => {
        desc = value
        console.log(desc);

    })
    return desc
}

module.exports = start