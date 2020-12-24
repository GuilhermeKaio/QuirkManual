var Wikia = require('node-wikia');
var bnhaWikia = new Wikia('myheroacademia');

async function Quirks(){
    const List = await bnhaWikia.getArticlesList({ category: 'Quirks', limit: 300})

    return List.items
}

async function Equipments(){
    const List = await bnhaWikia.getArticlesList({ category: 'Equipment & Weapons', limit: 300})

    return List.items
}

async function Moves(){
    const List = await bnhaWikia.getArticlesList({ category: 'Super Moves', limit: 300})

    return List.items
}

module.exports = {Quirks, Equipments, Moves}