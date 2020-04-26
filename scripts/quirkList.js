const puppeteer = require('puppeteer')

async function start(){
    page1 = await getQuirksPage1()
    await sleep(2000)
    page2 = await getQuirksPage2()
    await sleep(2000)
    const List = page1.concat(page2)
    return List
}

function sleep(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

async function getQuirksPage1() {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: true , args: ["--proxy-server='direct://'", '--proxy-bypass-list=*','--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0)
        await page.goto('https://bokunoheroacademia.fandom.com/wiki/Category:Quirks?from=Acid')

        const result = await page.evaluate(() => {
            const quirks = []
            document.querySelectorAll('article > div > div > div > div > ul > li > a')
                .forEach(quirk => quirks.push(quirk.getAttribute('title')))
            return quirks
        })

        browser.close()
        return result
    }
    quirkslist = []
    await scrape().then((value) => {
        
        quirkslist = value
    })

    return quirkslist
}

async function getQuirksPage2() {
    let scrape = async () => {
        const browser = await puppeteer.launch({headless: true , args: ["--proxy-server='direct://'", '--proxy-bypass-list=*','--no-sandbox', '--disable-setuid-sandbox'] })
        const page = await browser.newPage()
        await page.setDefaultNavigationTimeout(0)
        await page.goto('https://bokunoheroacademia.fandom.com/wiki/Category:Quirks?from=Sugar+Rush')

        const result = await page.evaluate(() => {
            const quirks = []
            document.querySelectorAll('article > div > div > div > div > ul > li > a')
                .forEach(quirk => quirks.push(quirk.getAttribute('title')))
            return quirks
        })

        browser.close()
        return result
    }
    quirkslist = []
    await scrape().then((value) => {
        
        quirkslist = value
    })

    return quirkslist
}

module.exports = start