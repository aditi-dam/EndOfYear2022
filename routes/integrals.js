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

function addNewLink(link) {
  let data = link + "\n";
  fs.writeFile('../public/links/integrals.txt', data, (err) => {
    if (err) {
      throw err;
    }
  })
}

let links = syncReadFile(path.join(__dirname, "../public/links/integrals.txt"));

router.get('/', async function(req, res, next) {
    try {
      let results = links;
      res.render('integrals', { title: 'Integrals', links: results, unit: 'integrals' });
    } catch (err) {
      next(err);
    }  
});

router.get('/add', async function(req, res, next) {
  try {
    res.render('addform', {title: "Add New Notes", unit: 'integrals'});
  } catch (err) {
    next(err);
  }
});

router.post('/', async function(req, res, next) {
  try {
    let results = req.body.note_link;
    console.log(results);
    addNewLink(results);
      
    res.redirect(`/integrals`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;