var express = require('express');
var router = express.Router();
var request = require('request');

/* GET vehicles listing. */
router.get('/', function(req, res, next) {
    var url = 'https://www.car2go.com/caba/customer/v2/vehicles/' + req.query.alias;
    request(url, function (error, response, body) {
        res.send(body);
    });

});


module.exports = router;