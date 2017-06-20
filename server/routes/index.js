var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/product', function(req, res, next) {
  res.render('product/index', { title: 'Express' });
});
router.get('/product/category', function(req, res, next) {
  res.render('product/classification', { title: 'Express' });
});
router.get('/product/detail', function(req, res, next) {
  res.render('product/detail', { title: 'Express' });
});
router.get('/case', function(req, res, next) {
  res.render('case/index', { title: 'Express' });
});

module.exports = router;
