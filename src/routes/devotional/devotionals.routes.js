const express = require('express');

const { httpGetTodaysDevotional, httpSaveDevotional, httpGetSavedDevotionals, httpGetDevotionalById } = require('./devotionals.controller');


const devotionalsRouter = express.Router();
devotionalsRouter.post('/save', httpSaveDevotional);
devotionalsRouter.get('/today', httpGetTodaysDevotional);
devotionalsRouter.get('/saved', httpGetSavedDevotionals);
devotionalsRouter.get("/saved/:id", httpGetDevotionalById);

module.exports = {
    devotionalsRouter,
}