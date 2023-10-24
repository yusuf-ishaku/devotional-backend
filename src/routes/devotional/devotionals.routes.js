const express = require('express');

const { httpGetTodaysDevotional, httpSaveDevotional, httpGetSavedDevotionals } = require('./devotionals.controller');


const devotionalsRouter = express.Router();
devotionalsRouter.post('/save', httpSaveDevotional);
devotionalsRouter.get('/today', httpGetTodaysDevotional);
devotionalsRouter.get('/saved', httpGetSavedDevotionals);
// devotionalsRouter.get("/:id",);

module.exports = {
    devotionalsRouter,
}