/* bring in the express server and create application */
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');

// use the express Router object
let router = express.Router();
//configure middleware to support JSON data parsing in request obj 
app.use(express.json());

/* create GET to return a list of all pies */
router.get('/', function(req, res, next) {
    pieRepo.get(function(data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved.",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});

//create  GET/search?id=n&name=str to search for pies by 'id' and/or 'name'
router.get('/search', function(req, res, next) {
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };

    pieRepo.search(searchObject, function(data) {
        res.status(200).json({
            "status": 200,
            "statusText": "OK",
            "message": "All pies retrieved.",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});




//GET/id to return a single pie 
router.get('/:id', function(req, res, next) {
    pieRepo.getById(req.params.id, function(data) {
        if (data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Single pie retrieved.",
                "data": data
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie ' " + req.params.id + " ' could not be found.",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie ' " + req.params.id + " ' could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});


router.post('/', function(req, res, next) {
    pieRepo.insert(req.body, function(data) {
        res.status(201).json({
            "status": 201,
            "statusText": "Created",
            "message": "New Pie Added.",
            "data": data
        });
    }, function(err) {
        next(err);
    });
});

router.put('/:id', function(req, res, next) {
    if (data) {
        pieRepo.getById(req.params.id, function(data) {
            res.status(200).json({
                "status": 200,
                "statusText": "OK",
                "message": "Pie ' " + req.params.id + " ' updated.",
                "data": data
            });
        });
    } else {
        res.status(404).json({
            "status": 404,
            "statusText": "Not Found",
            "message": "The pie ' " + req.params.id + " ' could not be found.",
            "error": {
                "code": "NOT_FOUND",
                "message": "The pie ' " + req.params.id + " '  could not be found."
            }
        });
    }

}, function(err) {
    next(err);
});

router.delete('/:id', function(req, res, next) {
    pieRepo.getById(req.params.id, function(data) {
        if (data) {
            pieRepo.delete(req.params.id, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "The pie ' " + req.params.id + " ' is deleted.",
                    "data": "Pie ' " + req.params.id +
                        " ' deleted."
                });
            });
        } else {
            res.status(404).json({
                "status": 404,
                "statusText": "Not Found",
                "message": "The pie ' " + req.params.id + " ' could not be found",
                "error": {
                    "code": "NOT_FOUND",
                    "message": "The pie ' " + req.params.id + " '  could not be found."
                }
            });
        }
    }, function(err) {
        next(err);
    });
});

router.patch('/:id', function(req, res, next) {
    pieRepo.getById(req.params.id, function(data) {
        if (data) {
            pieRepo.update(req.body, req.params.id, function(data) {
                res.status(200).json({
                    "status": 200,
                    "statusText": "OK",
                    "message": "Pie ' " + req.params.id + " '  patched.",
                    "data": data
                });
            });
        }
    })
})

/* configure router so all routes are prefixed with /api/  */
app.use('/api/', router);

//create server to listen on port 5000
var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000..');
});