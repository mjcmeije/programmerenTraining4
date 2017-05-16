/**
 * Created by bb2ridder on 15/05/2017.
 */
// API version 2
var express = require('express');
var router = express.Router();


router.get('/info', function(request, response) {
    response.status(200);
    response.json('Deze server maakt gebruik van api v2');
})

// fall back
router.all('*', function(request, response) {
    response.status(404);
    response.send('404 - Not found');
})

module.exports = router;