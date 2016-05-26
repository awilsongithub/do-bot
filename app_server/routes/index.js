/* require modules */
var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');








/* TODO test render hbs AND COMMENTED OUT MAIN / ROUTE BELOW */
// router.get('/', function(req, res){
//   res.render('june');
// });









/* locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router.get('/location/:locationid/reviews/new', ctrlLocations.addReview);
router.post('/location/:locationid/reviews/new', ctrlLocations.doAddReview);


/* other pages */
router.get('/about', ctrlOthers.about);

/* exports all the router methods above? */
module.exports = router;
