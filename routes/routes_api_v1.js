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
        values : [ "bbcity", "NLD", "bbmeer", 2000 ],
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
        values : [ "mark", id ],
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

router.get('/cities/search', function(request, response, next) {
    var countrycode = request.query.countryCode || '';
    var name = request.query.name || '';
    var limit = request.query.limit || '';
    var query_str;

    if (countrycode != '' && name != '') {
        query_str = {
            sql: query_str = 'SELECT * FROM city WHERE countryCode=? AND name=?',
            values: [countrycode, name],
            timeout: 2000
        }
    } else if (countrycode != '') {
        query_str = {
            sql: query_str = 'SELECT * FROM city WHERE countryCode=?',
            values: [countrycode],
            timeout: 2000
        }
    } else if (name != '') {
        query_str = {
            sql: query_str = 'SELECT * FROM city WHERE name=?',
            values: [name],
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
















router.get('/countries/search', function(request, response, next) {
    var continent = request.query.continent || '';
//    var name = request.query.name || '';
    var limit = request.query.limit || '';
    var query_str;

    if (continent != '') {
        query_str = {
            sql: query_str = 'SELECT * FROM country WHERE continent=?',
            values: [continent],
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

router.get('/countries', function(request, response) {
    var query_str = {
        sql: query_str = 'SELECT * FROM country',
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

router.get('/countries/:code?', function(request, response, next) {
    var code = request.params.code || '';
    var query_str;

  //  if (id > 0) {
        query_str = 'SELECT * FROM country WHERE Code = "' + code + '";';

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
    // } else {
    //     next();
    //     return;
    // }
});

router.post('/countries', function(request, response) {
    console.log('test.');
    var country = request.body;
    console.log(country.name);
    var query_str = {
        sql: 'INSERT INTO `country` (code, name, continent, population) VALUES (?, ?, ?, ?)',
        values : [ "MML", "MMeijerLand", "Europe", 567 ],
        timeout : 2000 // 2secs
    };

    console.dir(country);
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

// update alleen country.name op basis van country.code
router.put('/countries/:code', function(request, response) {

    var country = request.body;
    var code = request.params.code;
    var query_str = {
        sql: 'UPDATE `country` SET name=? WHERE code=?',
        values : [ "MarkLand", code ],
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

// op basis van country.code
router.delete('/countries/:code', function(request, response) {

    var code = request.params.code;
    var query_str = {
        sql: 'DELETE FROM `country` WHERE code=?',
        values : [ code ],
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


// OUDE MANIER CONNECTEN
// connector.query(query_str, function (error, rows, fields) {
//     if (error) {
//         response.status(400).json(error);
//     } else {
//         response.status(200).json(rows);
//     }
// });

