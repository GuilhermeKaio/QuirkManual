var Twit = require('twit')
const imageDownloader = require('image-downloader')
const dotenv = require('dotenv')
var fs = require('fs')

async function start(Info) {
    await downloadAndSave(Info[1])
    await tweet(Info)

    function tweet(Info) {
        dotenv.config()
        var T = new Twit({
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
            access_token: process.env.ACCESS_TOKEN,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        })

        var b64content = fs.readFileSync('./content/quirk.png', { encoding: 'base64' })

        T.post('media/upload', { media_data: b64content }, function (err, data, response) {
            var mediaIdStr = data.media_id_string
            var altText = "Pokemon"
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

            T.post('media/metadata/create', meta_params, function (err, data, response) {
                if (!err) {
                    textstatus = `${Info[0]}\r\n\r\nUser: ${Info[3]}\r\n\r\nType: ${Info[2]}\r\n\r\n${Info[4]}`
                    var params = { status: textstatus, media_ids: [mediaIdStr] }

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
    function downloadAndSave(url) {
        return imageDownloader.image({
            url: url,
            dest: './content/quirk.png'
        })
    }
}

module.exports = start