const express = require('express');
const cors = require('cors');
const devotionalsRouter = require('./routes/devotional/devotionals.routes').devotionalsRouter;


const app = express();
app.use(cors())
app.use('/devotions', devotionalsRouter);

module.exports = app;