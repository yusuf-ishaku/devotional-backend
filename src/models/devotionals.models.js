// 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
const axios = require('axios');
const schedule = require('node-schedule')
// still learning how to set environment variables
//const TOKEN = "6Oj6evEBEETGeRwi4cznJ5EBOlaXgn3uUpsFclS2";
const devotionalsDatabase = require("./devotionals.mongo");

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;

const options = {
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`
    },
    method: 'POST',
    url: 'https://api.cohere.ai/v1/generate',
    data: {
        // max_tokens: 300,
        truncate: 'END',
        return_likelihoods: 'NONE',
        prompt: 'Please give me a devotional bible article for today'
    }
};



async function main(){
    const response = await axios.request(options);
    await setTodaysDevotional({
        devotional: response.data.generations[0].text, 
        date: Date.now()
    });
    // console.log(response.data.generations[0].text);
    return response.data
}

async function setTodaysDevotional(devotional){
    const data = await devotionalsDatabase.find({});
    // console.log(data)
    if(data.length === 0){
        const devotionalToday = new devotionalsDatabase(devotional);
        await devotionalToday.save();
    }else{
       await devotionalsDatabase.findByIdAndUpdate(data[0]['_id'], devotional);
    }
}
async function getTodaysDevotional(){
    const data = await devotionalsDatabase.find({});
    return data[0];
}

const job = schedule.scheduleJob(rule, main);
// job();
module.exports = {
    job,
    getTodaysDevotional
}
