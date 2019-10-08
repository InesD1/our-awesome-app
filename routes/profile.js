var express = require('express');
var router = express.Router();

router.get('/profile', function(req, res, next) {
  res.render("profile")
});

module.exports = router;