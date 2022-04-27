require('dotenv').config()

const userRouter = require('../server/routes/user')
const authRouter = require('../server/routes/auth')
const favRouter = require('../server/routes/fav')
const { connect } = require('./connect');
const express = require("express");

const app = express();

connect();

app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/api', favRouter);

module.exports = app