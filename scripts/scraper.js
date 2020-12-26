const uniqueRandom = require('unique-random')

async function getUser(page, info, quirk){
    try {
        await page.waitForSelector('div[data-source="user"]');
        user = await page.evaluate(() => {
            const elements = document.querySelectorAll('div[data-source="user"] > div > ul > li');
            for (var element of elements) {
                if(element.textContent.indexOf(" (Current)") != -1){
                    return element.textContent.substring(element.textContent.indexOf(" (Current)"), 0);
                }
            }
            let solo = document.querySelector('div[data-source="user"] > div > a');
            if(solo === undefined){
                solo = document.querySelector('div[data-source="user"] > div');
            }
            return solo.textContent;
        });
    } 
    catch (err) {
        user = info.items[quirk.id].abstract.substring(info.items[quirk.id].abstract.indexOf("by") + 3, info.items[quirk.id].abstract.indexOf("."))
        if(user.indexOf("[") != -1){
            user = user.substring(0, user.indexOf("["))
        }
    }
    return user;
}

async function getType(page){
    type = await page.evaluate(() => {
        let solo = document.querySelector('div[data-source="type"] > div > a');
        if(solo == undefined){
            solo = document.querySelector('div[data-source="type"] > div');
        }
        return solo.textContent;
    })
    return type;
}

async function getEffect(page){
    effect = await page.evaluate(() => {
        let solo = document.querySelector('div[data-source="effects"] > div > a');
        if(solo == undefined){
            solo = document.querySelector('div[data-source="effects"] > div');
        }
        return solo.textContent;
    })
    return effect;
}

async function getSource(page){
    try{
        source = await page.evaluate(() => {
            let solo = document.querySelector('div[data-source="source"] > div > a');
            if(solo == undefined){
                solo = document.querySelector('div[data-source="source"] > div');
            }
            return solo.textContent;
        })
    }
    catch{
        source = 'Unknown'
    }
    
    return source;
}

async function getMRange(page){
    mRange = await page.evaluate(() => {
        let solo = document.querySelector('div[data-source="move range"] > div > a');
        if(solo == undefined){
            solo = document.querySelector('div[data-source="move range"] > div');
        }
        return solo.textContent;
    })
    return mRange;
}

async function getCapabilities(page){
    capabilities = await page.evaluate(() => {
        let solo = document.querySelector('div[data-source="capabilities"] > div > a');
        if(solo == undefined){
            solo = document.querySelector('div[data-source="capabilities"] > div');
        }
        return solo.textContent;
    })
    return capabilities;
}

async function getQType(page){
    type = await page.evaluate(() => {
        let solo = document.querySelector('div[data-source="quirk type"] > div > a');
        if(solo == undefined){
            solo = document.querySelector('div[data-source="quirk type"] > div');
        }
        return solo.textContent;
    })
    return type;
}

async function getImg(page, info){
    await page.waitForSelector('img.pi-image-thumbnail');
    imgs = await page.evaluate(() => {
        let data = [];
        const elements = document.querySelectorAll('img.pi-image-thumbnail');
        elements.forEach(element => {
            data.push(element.getAttribute('src'));
        })
        return data;
    });
    const randomImg = uniqueRandom(0, imgs.length-1);
    return resolveUrl(imgs[randomImg()]);
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

function getDesc(desc, limit){
    index = 0;
    if(desc.indexOf("Navigation") != -1){
        desc = desc.substring(desc.indexOf("Navigation") + 10, desc.length);
    }
    else{
        desc = desc.substring(desc.indexOf(".")+ 2);
    }
    if(desc.indexOf(" ") == 0){
        desc = desc.substring(desc.indexOf(" ") + 1, desc.length);
    }
    if(desc.indexOf(".") == 0){
        desc = desc.substring(desc.indexOf(".") + 1, desc.length);
    }
    if(desc.indexOf("Sports Festival. ") == 0){
        desc = desc.substring(desc.indexOf("Sports Festival. ") + 17, desc.length);
    }
    ret = '';
    while(desc.indexOf(".", index) != -1){
        if(desc.indexOf(".", index) <= limit){
            ret = desc.substring(0, desc.indexOf(".", index) + 1);
            index = desc.indexOf(".", index) + 1;
        }
        else{
            break;
        }
    }

    if(ret == ''){
        while(desc.indexOf(",", index) != -1){
            if(desc.indexOf(",", index) <= limit){
                ret = desc.substring(0, desc.indexOf(",", index)) + '.';
                index = desc.indexOf(",", index) + 1;
            }
            else{
                break;
            }
        } 
    }
    return ret;
}

module.exports = { getUser, getType, getQType, getImg, getDesc, getEffect, getSource, getMRange, getCapabilities };