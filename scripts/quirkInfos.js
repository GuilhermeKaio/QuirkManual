var Wikia = require('node-wikia');
var bnhaWikia = new Wikia('myheroacademia');
const puppeteer = require('puppeteer');
const scraper = require('./scraper.js');

async function start(quirk){
    const browser = await puppeteer.launch({ headless: true, args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()

    info = await bnhaWikia.getArticleDetails({ ids: quirk.id, abstract: 500 });
    await page.goto(`https://bokunoheroacademia.fandom.com${info.items[quirk.id].url}`, { waitUntil: 'networkidle2' })
    quirkName = info.items[quirk.id].title;
    imgUrl = await scraper.getImg(page, info);
    desc = scraper.getDesc(info.items[quirk.id].abstract, 170);
    type = await scraper.getQType(page);
    user = await scraper.getUser(page, info, quirk);

    ret = {quirkName, imgUrl, desc, user, type};
    browser.close();
    return ret;
}

module.exports = start