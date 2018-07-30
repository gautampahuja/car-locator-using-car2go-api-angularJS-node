var express = require('express');
var router = express.Router();
var request = require('request');

/* GET locations listing. */
router.get('/', function(req, res, next) {
    request('https://www.car2go.com/caba/customer/v2/locations', function (error, response, body) {
        res.send(body);
    });
});


module.exports = router;