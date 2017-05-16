/**
 * Created by bb2ridder on 15/05/2017.
 */
// API version 1
var express = require('express');
var router = express.Router();
var pool = require('../db/db_connector');

router.post('/cities', function(request, response) {
    console.log('test.');
    var city = request.body;
    console.log(city.name);
    var query_str = {
        sql: 'INSERT INTO `city` (name, countryCode, district, population) VALUES (?, ?, ?, ?)',
        values : [ city.name, city.countryCode, city.district, city.population ],
        timeout : 2000 // 2secs
    };

    console.dir(city);
    console.log('Query: ' + query_str.sql + "\n" + query_str.values);

    response.contentType('application/json');

    pool.getConnection(function (error, connection) {
        if (error) {
            throw error
        }
        connection.query(query_str, function (error, rows, fields) {
            connection.release();
            if (error) {
                throw error
            }
            response.status(200).json(rows);
        });
    });
});

// op basis van city.id
router.delete('/cities/:id', function(request, response) {

    var id = request.params.id;
    var query_str = {
        sql: 'DELETE FROM `city` WHERE id=?',
        values : [ id ],
        timeout : 2000
    };

    console.log('Query: ' + query_str.sql) + "\n" + query_str.values;

    response.contentType('application/json');

    pool.getConnection(function (error, connection) {
        if (error) {
            throw error
        }
        connection.query(query_str, function (error, rows, fields) {
            connection.release();
            if (error) {
                throw error
            }
            response.status(200).json(rows);
        });
    });
});

// update alleen city.name op basis van city.id
router.put('/cities/:id', function(request, response) {

    var city = request.body;
    var id = request.params.id;
    var query_str = {
        sql: 'UPDATE `city` SET name=? WHERE id=?',
        values : [ city.name, id ],
        timeout : 2000
    };

    console.log('Query: ' + query_str.sql + "\n" + query_str.values + "\n");

    response.contentType('application/json');

    pool.getConnection(function (error, connection) {
        if (error) {
            throw error
        }
        connection.query(query_str, function (error, rows, fields) {
            connection.release();
            if (error) {
                throw error
            }
            response.status(200).json(rows);
        });
    });
});

// betere manier misschien?
router.get('/cities/search', function(request, response, next) {
    var countryCode = request.query.countryCode || '';
    var population = request.query.population || '';
    var limit = request.query.limit || '';
    var query_str;

    // population filtert op minstens, dus niet precies het getal
    if (countryCode != '' && population != '') {
        query_str = {
            sql: query_str = 'SELECT * FROM city WHERE countryCode=? AND population>=?',
            values: [countryCode, population],
            timeout: 2000
        }
    } else if (countryCode != '') {
        query_str = {
            sql: query_str = 'SELECT * FROM city WHERE countryCode=?',
            values: [countryCode],
            timeout: 2000
        }
    } else if (population != '') {
        query_str = {
            sql: query_str = 'SELECT * FROM city WHERE population>=?',
            values: [population],
            timeout: 2000
        }
    } else {
        next();
        return;
    }

    if (limit > 0) {
        query_str.sql += ' LIMIT ' + limit;
    }

    console.log('Query: ' + query_str.sql + "\n" + query_str.values + "\n");

    response.contentType('application/json');

    pool.getConnection(function (error, connection) {
        if (error) {
            throw error
        }
        connection.query(query_str, function (error, rows, fields) {
            connection.release();
            if (error) {
                throw error
            }
            response.status(200).json(rows);
        });
    });
});

router.get('/cities/:id?', function(request, response, next) {
    var id = request.params.id;
    var query_str;

    if (id > 0) {
        query_str = 'SELECT * FROM city WHERE ID = "' + id + '";';

        pool.getConnection(function (error, connection) {
            if (error) {
                throw error
            }
            connection.query(query_str, function (error, rows, fields) {
                connection.release();
                if (error) {
                    throw error
                }
                response.status(200).json(rows);
            });
        });
    } else {
        next();
        return;
    }
});

router.get('/cities', function(request, response) {
    var query_str = {
        sql: query_str = 'SELECT * FROM city',
        values: [],
        timeout: 2000
    }
    console.log('Query: ' + query_str.sql + query_str.values + "\n");

    response.contentType('application/json');

    pool.getConnection(function (error, connection) {
        if (error) {
            throw error
        }
        connection.query(query_str, function (error, rows, fields) {
            connection.release();
            if (error) {
                throw error
            }
            response.status(200).json(rows);
        });
    });
});

module.exports = router;







