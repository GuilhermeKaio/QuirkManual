const getList = require('./scripts/list.js');
const quirkInfo = require('./scripts/quirkInfos.js');
const equipInfo = require('./scripts/equipmentInfo.js');
const moveInfo = require('./scripts/moveInfo.js');
const twitter = require('./scripts/twitter.js');
const uniqueRandom = require('unique-random');

async function start() {

    const randomSub = uniqueRandom(0, 2);
    let sort = randomSub();
    let List;
    let random;
    switch (sort) {
        case 0:
            List = await getList.Quirks();
            random = uniqueRandom(1, List.length);
            Info = await quirkInfo(List[random()]);
            await twitter.Quirk(Info);
            break;
        case 1:
            List = await getList.Equipments();
            random = uniqueRandom(1, List.length);
            Info = await equipInfo(List[random()]);
            await twitter.Equipment(Info);
            break;
        case 2:
            List = await getList.Moves();
            random = uniqueRandom(1, List.length);
            Info = await moveInfo(List[random()]);
            await twitter.Move(Info);
            break;
        default:
          console.log(`${sort} is not a option!`);
          break;
      }
}

start()