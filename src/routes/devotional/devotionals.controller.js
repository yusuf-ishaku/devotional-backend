const { getTodaysDevotional, saveDevotional , getSavedDevotionals, getDevotionalById} = require("../../models/devotional.model");

async function httpGetTodaysDevotional(req, res){
   let data = await getTodaysDevotional();
   // console.log(data)
   return res.status(200).json({
      devotional: data.devotional, 
      date: data.date,
      _id: data._id
  });
};

async function httpSaveDevotional(req, res){
    const data = await req.body;
    let response = await saveDevotional(data);
    return res.status(200).json({
        message: response
    })
}

async function httpGetSavedDevotionals(req, res){
    const data = await getSavedDevotionals();
    let mappedData = data.map((x) =>(
    {date: x.date, _id: x._id, devotional: x.devotional}
    ))
    // console.log(mappedData);
    return res.status(200).json(mappedData);
}

async function httpGetDevotionalById(req, res){
    let data = await getDevotionalById(req.params.id);
    return res.status(200).json(data[0]);
}

module.exports = {
    httpGetTodaysDevotional,
    httpSaveDevotional,
    httpGetSavedDevotionals,
    httpGetDevotionalById
}