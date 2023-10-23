const main = require("../../models/devotionals.models").main;

async function getTodaysDevotional(req, res){
   let data = await main();
   console.log(data)
   let devotion = data.generations[0].text;
   return res.status(200).json(devotion);
}

module.exports = {
    getTodaysDevotional,
}