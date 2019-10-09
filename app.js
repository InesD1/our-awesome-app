require('dotenv').config();

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const favicon = require('serve-favicon')
const hbs = require('hbs')
const mongoose = require('mongoose')
const logger = require('morgan')
const path = require('path')
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const createError = require('http-errors');

mongoose
  .connect('mongodb://localhost/openFoodFact', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

const appName = require('./package.json').name
const debug = require('debug')(`${appName}:${path.basename(__filename).split('.')[0]}`)

const app = express()

// Middleware Setup
app.use(session({
  secret: "basic-auth-secret",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 *1000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 *1000 // 1 day
  })
}));

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// Express View engine setup
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator'

const index = require('./routes/index')
app.use('/', index)
app.use('/auth', require('./routes/auth/login'))
app.use('/', require('./routes/products'))
app.use ('/', require('./routes/product'))

app.listen(3000, ()=>{console.log(`App is listening on port 3000`)});

module.exports = app


