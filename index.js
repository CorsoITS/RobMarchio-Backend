require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const routerSede = require('./routes/sede-router');
const app = express()

app.use(json());

// app.options('*', cors())

app.use('/sedi', routerSede);

app.listen(3000);