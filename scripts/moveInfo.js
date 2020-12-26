var Wikia = require('node-wikia');
var bnhaWikia = new Wikia('myheroacademia');
const puppeteer = require('puppeteer');
const scraper = require('./scraper.js');

async function start(move){
    const browser = await puppeteer.launch({ headless: true, args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    page.setDefaultTimeout(0);

    info = await bnhaWikia.getArticleDetails({ ids: move.id, abstract: 500 });
    await page.goto(`https://bokunoheroacademia.fandom.com${info.items[move.id].url}`, { waitUntil: 'networkidle2' })
    moveName = info.items[move.id].title;
    imgUrl = await scraper.getImg(page, info);
    desc = info.items[move.id].abstract;
    user = await scraper.getUser(page, info, move);
    range = await scraper.getMRange(page);
    capabilities = await scraper.getCapabilities(page);

    ret = { moveName, imgUrl, desc, user, range, capabilities };
    browser.close();
    return ret;
}

module.exports = start