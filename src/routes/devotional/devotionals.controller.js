const { getTodaysDevotional } = require("../../models/devotionals.models");

async function httpGetTodaysDevotional(req, res){
   let data = await getTodaysDevotional();
   // console.log(data)
   return res.status(200).json({
      devotional: data.devotional, 
      date: data.date,
      _id: data._id
  });
}

module.exports = {
    httpGetTodaysDevotional,
}