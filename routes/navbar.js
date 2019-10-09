var express = require('express');
var router = express.Router();

router.get('partials/navbar', function(req, res, next) {
  res.render("navbar")
});

module.exports = router;