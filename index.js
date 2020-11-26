/* bring in the express server and create application */
let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo');

// use the express Router object
let router = express.Router();


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

/* configure router so all routes are prefixed with /api/  */
app.use('/api/', router);

//create server to listen on port 5000
var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000..');
});