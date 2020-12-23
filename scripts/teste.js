var Wikia = require('node-wikia');
var bnhaWikia = new Wikia('myheroacademia');
const puppeteer = require('puppeteer');

async function start(quirk){
    const browser = await puppeteer.launch({ headless: false, args: ["--proxy-server='direct://'", '--proxy-bypass-list=*', '--no-sandbox', '--disable-setuid-sandbox'] })
    const page = await browser.newPage()

    info = await bnhaWikia.getArticleDetails({ ids: quirk.id, abstract: 500 });
    console.log(info.items[quirk.id]);
    await page.goto(`https://bokunoheroacademia.fandom.com${info.items[quirk.id].url}`, { waitUntil: 'networkidle2' })
    quirkName = info.items[quirk.id].title;
    imgUrl = resolveUrl(info.items[quirk.id].thumbnail);
    desc = getDesc(info.items[quirk.id].abstract);
    type = await getType(page);
    user = getUser(info.items[quirk.id].abstract);

    ret = {quirkName, imgUrl, desc, user, type};
    console.log(ret);
    browser.close();
    return ret;
}

async function getType(page){
    type = await page.evaluate(() => {
        const anchor = document.querySelector('a[title="Quirk"]');
        return anchor.textContent;
    })
    return type;
}

function resolveUrl(url) {
    if (url.indexOf(".png") != -1) {
        url = url.substring(url.indexOf(".png") + 4, 0);
    }
    else {
        url = url.substring(url.indexOf(".gif") + 4, 0);
    }
    return url;
}

function getUser(desc){
    user = desc.substring(desc.indexOf("by") + 3, desc.indexOf("."))
    if(user.indexOf("[") != -1){
        user = user.substring(0, desc.indexOf("["))
    }
    return user;
}

function getDesc(desc){
    index = 0;
    if(desc.indexOf("Site Navigation") != -1){
        desc = desc.substring(desc.indexOf("Site Navigation") + 16, desc.length);
    }
    else{
        desc = desc.substring(desc.indexOf(".")+ 1);
    }
    ret = '';
    console.log(desc);
    while(desc.indexOf(".", index) != -1){
        if(desc.indexOf(".", index) <= 170){
            ret = desc.substring(0, desc.indexOf(".", index) + 1);
            index = desc.indexOf(".", index) + 1;
            console.log(ret);
        }
        else{
            break;
        }
    }

    if(ret == ''){
        while(desc.indexOf(",", index) != -1){
            if(desc.indexOf(",", index) <= 170){
                ret = desc.substring(0, desc.indexOf(".", index) + 1);
                index = desc.indexOf(".", index) + 1;
                console.log(ret);
            }
            else{
                break;
            }
        } 
    }
    return ret;
}

module.exports = start