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

  /**
   * If the array gets overloaded by accident,
   * comment out the appendFile line and replace it with
   * fs.writeFile('../electricity.txt', '', (err)...)
   */

  /*fs.appendFile('../electricity.txt', data,*/
  fs.writeFile('../electricity.txt', '', (err) => {
    if (err) {
      throw err;
    }
  })
}

// let links = syncReadFile(path.join(__dirname, "../public/links/electricity.txt"));

router.get('/', async function(req, res, next) {
    try {
      let results = syncReadFile("../electricity.txt");
      res.render('electricity', { title: 'Electricity', links: results, unit: 'electricity' });
    } catch (err) {
      next(err);
    }  
});

router.get('/add', async function(req, res, next) {
    try {
      res.render('addform', {title: "Add New Notes", unit: 'electricity'});
    } catch (err) {
      next(err);
    }
});

router.post('/', async function(req, res, next) {
    try {
      let results = req.body.note_link;
      console.log(results);
      // addNewLink(results);
      //syncReadFile("../electricity.txt");

      res.redirect(`/electricity`);
    } catch (err) {
      next(err);
    }
});

module.exports = router;