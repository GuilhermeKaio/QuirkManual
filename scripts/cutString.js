function start(info, quirk) {
    if (info[0].indexOf(".png") != -1) {
        url = info[0].substring(info[0].indexOf(".png") + 4, 0)
    }
    else {
        url = info[0].substring(info[0].indexOf(".gif") + 4, 0)
    }

    type = info[1].substring(info[1].indexOf("Quirks"), 0)

    user = info[2].substring(info[2].indexOf("by") + 3, info[2].indexOf("\n"))
    if(user.indexOf("[") != -1){
        user = user.substring(0, desc.indexOf("["))
    }

    desc = info[3].substring(0, info[3].indexOf("\n"))
    if (desc.indexOf("[") != -1){
        desc = desc.substring(0, desc.indexOf("["))
    }

    console.log(desc);

    infos = [quirk, url, type, user, desc]

    return infos

}

module.exports = start