var Wikia = require('node-wikia');
var bnhaWikia = new Wikia('myheroacademia');

async function start(){
    const List = await bnhaWikia.getArticlesList({ category: 'Quirks', limit: 300})

    return List.items
}

module.exports = start