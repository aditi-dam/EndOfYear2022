var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');


router.get('/', async function(req, res, next) {
    try {
      res.render('magnetism', { title: 'Magnetism' });
    } catch (err) {
      next(err);
    }  
});

module.exports = router;