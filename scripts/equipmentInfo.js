var Wikia = require('node-wikia');
var bnhaWikia = new Wikia('myheroacademia');
const puppeteer = require('puppeteer');
const scraper = require('./scraper.js');

async function start(equipment){
    const browser = await puppeteer.launch({ headless: true, args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    page.setDefaultTimeout(0);

    info = await bnhaWikia.getArticleDetails({ ids: equipment.id, abstract: 500 });
    await page.goto(`https://bokunoheroacademia.fandom.com${info.items[equipment.id].url}`, { waitUntil: 'networkidle2' })
    equipmentName = info.items[equipment.id].title;
    imgUrl = await scraper.getImg(page, info);
    desc = info.items[equipment.id].abstract;
    type = await scraper.getType(page);
    user = await scraper.getUser(page, info, equipment);
    effect = await scraper.getEffect(page);
    source = await scraper.getSource(page);

    ret = { equipmentName, imgUrl, desc, user, type, effect, source };
    browser.close();
    return ret;
}

module.exports = start