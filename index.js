require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const routerSede = require('./routes/sede-router');
const app = express()
const ConnectRouter = require ('./routes/main.router');

app.use(json());
app.use(urlencoded({ extended: true }));

// app.options('*', cors())

ConnectRouter(app);

app.listen(3000);