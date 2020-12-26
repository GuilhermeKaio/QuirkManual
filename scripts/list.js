var Wikia = require('node-wikia');
var bnhaWikia = new Wikia('myheroacademia');

async function Quirks(){
    let List = await bnhaWikia.getArticlesList({ category: 'Quirks', limit: 300})
    List.items = RemoveIndexString(List.items, "User_blog");
    List.items = RemoveIndexString(List.items, "Category");
    
    return List.items
}

async function Equipments(){
    let List = await bnhaWikia.getArticlesList({ category: 'Equipment & Weapons', limit: 300})
    List.items = RemoveIndexString(List.items, "User_blog");
    List.items = RemoveIndexString(List.items, "Category");

    return List.items
}

async function Moves(){
    let List = await bnhaWikia.getArticlesList({ category: 'Super Moves', limit: 300})
    List.items = RemoveIndexString(List.items, "User_blog");
    List.items = RemoveIndexString(List.items, "Category");

    return List.items
}

function RemoveIndexString(arr, String){
    for( var i = arr.length - 1; i >= 0 ; i--){ 
        if (arr[i].url.indexOf(String) != -1 ) {
            arr.splice(i, 1); 
        }
    }
    return arr;
}

module.exports = {Quirks, Equipments, Moves}