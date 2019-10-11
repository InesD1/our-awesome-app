const express = require('express');
const router  = express.Router();



router.get('/home', function(req, res, next) {
  console.log(req.session)
    const user = req.session.user || null
    res.render("home", user)
});
 
module.exports = router;
