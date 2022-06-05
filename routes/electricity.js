var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);

  console.log(arr);
  return arr;
}

let links = syncReadFile(path.join(__dirname, "../public/links/electricity.txt"));

router.get('/', async function(req, res, next) {
    try {
      let results = links;
      res.render('electricity', { title: 'Electricity', links: results });
    } catch (err) {
      next(err);
    }  
});

module.exports = router;