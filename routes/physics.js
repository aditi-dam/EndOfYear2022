var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');


router.get('/', async function(req, res, next) {
    try {
      res.render('physics', { title: 'Physics' });
    } catch (err) {
      next(err);
    }  
});

module.exports = router;