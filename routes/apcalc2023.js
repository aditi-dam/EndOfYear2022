var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');


router.get('/', async function(req, res, next) {
    try {
      res.render('apcalc2023', { title: 'AP Calculus 2023' });
    } catch (err) {
      next(err);
    }  
});

module.exports = router;