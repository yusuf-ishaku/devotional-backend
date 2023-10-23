const express = require('express');

const { httpGetTodaysDevotional } = require('./devotionals.controller');


const devotionalsRouter = express.Router();
// devotionalsRouter.get('/saved', );
devotionalsRouter.get('/today', httpGetTodaysDevotional);
// devotionalsRouter.get("/:id",)

module.exports = {
    devotionalsRouter,
}