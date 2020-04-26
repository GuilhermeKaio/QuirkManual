const puppeteer = require('puppeteer')

async function getQuirks() {
    let scrape = async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
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

module.exports = getQuirks