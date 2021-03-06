var Twit = require('twit');
const imageDownloader = require('image-downloader');
var fs = require('fs');
const scraper = require('./scraper.js');

async function Quirk(Info) {
    await downloadAndSave(Info.imgUrl)
    await tweet(Info)

    function tweet(Info) {
        var T = new Twit({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        })

        textStatus = `Quirk - ${Info.quirkName}\r\n\r\nUser: ${Info.user}\r\n\r\n${Info.type}\r\n\r\n`;
        desc = scraper.getDesc(Info.desc, 275 - textStatus.length);
        textStatus = textStatus + desc;

        var b64content = fs.readFileSync('./content/quirk.png', { encoding: 'base64' })

        T.post('media/upload', { media_data: b64content }, function (err, data, response) {
            var mediaIdStr = data.media_id_string
            var altText = Info.quirkName
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

            T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    var params = { status: textStatus, media_ids: [mediaIdStr] }

                    T.post('statuses/update', params, function (err, data, response) {
                        console.log('Tweet realizado com sucesso!')
                    })
                }
                else {
                    console.log(err)
                }
            })
        })
    }
}

async function Move(Info) {
    await downloadAndSave(Info.imgUrl)
    await tweet(Info)

    function tweet(Info) {
        var T = new Twit({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        })

        textStatus = `Super Move - ${Info.moveName}\r\n\r\nUser: ${Info.user}\r\n\r\n${Info.range}\r\n\r\n${Info.capabilities}\r\n\r\n`
        desc = scraper.getDesc(Info.desc, 275 - textStatus.length);
        textStatus = textStatus + desc;

        var b64content = fs.readFileSync('./content/quirk.png', { encoding: 'base64' })

        T.post('media/upload', { media_data: b64content }, function (err, data, response) {
            var mediaIdStr = data.media_id_string
            var altText = Info.moveName
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

            T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    var params = { status: textStatus, media_ids: [mediaIdStr] }

                    T.post('statuses/update', params, function (err, data, response) {
                        console.log('Tweet realizado com sucesso!')
                    })
                }
                else {
                    console.log(err)
                }
            })
        })
    }
}

async function Equipment(Info) {
    await downloadAndSave(Info.imgUrl)
    await tweet(Info)

    function tweet(Info) {
        var T = new Twit({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        })

        textStatus = `Equipment - ${Info.equipmentName}\r\n\r\nUser: ${Info.user}\r\n\r\n${Info.type} - ${Info.effect}\r\n\r\nSource: ${Info.source}\r\n\r\n`
        desc = scraper.getDesc(Info.desc, 275 - textStatus.length);
        textStatus = textStatus + desc;

        var b64content = fs.readFileSync('./content/quirk.png', { encoding: 'base64' })

        T.post('media/upload', { media_data: b64content }, function (err, data, response) {
            var mediaIdStr = data.media_id_string
            var altText = Info.equipmentName
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

            T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    var params = { status: textStatus, media_ids: [mediaIdStr] }

                    T.post('statuses/update', params, function (err, data, response) {
                        console.log('Tweet realizado com sucesso!')
                    })
                }
                else {
                    console.log(err)
                }
            })
        })
    }
}

function downloadAndSave(url) {
    return imageDownloader.image({
        url: url,
        dest: './content/quirk.png'
    })
}

module.exports = { Quirk, Move, Equipment}