const express = require('express')
const app = express()

app.get('/login', (req, res) => {
  res.render('auth/login')
})