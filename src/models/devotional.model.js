// 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
const axios = require('axios');
const schedule = require('node-schedule')
// still learning how to set environment variables
const TOKEN = process.env.TOKEN;
const {devotionalDatabase, savedDevotionalsDatabase} = require("./devotional.mongo");

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
    const data = await devotionalDatabase.find({});
    // console.log(data)
    if(data.length === 0){
        const devotionalToday = new devotionalDatabase(devotional);
        await devotionalToday.save();
    }else{
       await devotionalDatabase.findByIdAndUpdate(data[0]['_id'], devotional);
    }
}
async function getTodaysDevotional(){
    const data = await devotionalDatabase.find({});
    return data[0];
}

async function saveDevotional(devotional){
    const devotionalAvailable = await savedDevotionalsDatabase.find({ _id: devotional["_id"]});
    // console.log(devotionalAvailable);
    if(devotionalAvailable.length === 0){
        let newDevotional = new savedDevotionalsDatabase({_id: devotional["_id"], devotional: devotional.devotional, date: devotional.date});
        await newDevotional.save();
        return "Devotional saved successfully"
    }
    else{
        return "Devotional already saved"
    }
};

async function getSavedDevotionals(){
    const devotionals = await savedDevotionalsDatabase.find({});
    return devotionals
}

async function getDevotionalById(id){
    const devotionalAtId = await savedDevotionalsDatabase.find({_id: id});
    return devotionalAtId;
}
const job = schedule.scheduleJob(rule, main);
// job();
module.exports = {
    job,
    getTodaysDevotional,
    saveDevotional,
    getSavedDevotionals,
    getDevotionalById,
}
