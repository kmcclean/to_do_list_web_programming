/**
 * Created by Kevin on 3/23/2016.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('/about');
});

module.exports = router;