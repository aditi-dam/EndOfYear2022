var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

function syncReadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);

  if (arr.length === 0) {
    console.log("Array is empty.");
  }
  else {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == '') {
        arr.splice(i, 1);
      }
    }
  }

  console.log(arr);
  return arr;
}

function addNewLink(link) {
  let data = link + "\n";

  // Clear out the array manually if it gets overloaded:
  // fs.writeFile('../integrals.txt', '', (err) => {
  //   if (err) {
  //     throw err;
  //   }
  // })  

  fs.appendFile('../integrals.txt', data, (err) => {
    if (err) {
      throw err;
    }
  })
}

router.get('/', async function(req, res, next) {
    try {
      let results = syncReadFile("../integrals.txt");
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