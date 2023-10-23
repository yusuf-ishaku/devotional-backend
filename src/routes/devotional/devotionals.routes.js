const express = require('express');

const getTodaysDevotional = require('./devotionals.controller').getTodaysDevotional;


const devotionalsRouter = express.Router();
// devotionalsRouter.get('/all', );
devotionalsRouter.get('/today', getTodaysDevotional);
// devotionalsRouter.get("/:id",)

module.exports = {
    devotionalsRouter,
}