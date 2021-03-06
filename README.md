<!-- MVC NOTES  -->

<!-- routes -->
<!-- require express, invoke Router(), require controllers -->
var express = require('express');
var router = express.Router();
var aboutCtrlr = require('../controllers/locations.js');
<!-- use router.get with path and controller -->
router.get('/about', aboutCtrlr);

<!-- controllers
export function taking req and res containing render taking view and data  -->
module.exports.homelist = function(req, res) {
  res.render('homepageView', {
    title: 'Home Page',
    tagline: 'Welcome to the home page!'
    });
};

<!-- views -->
extends layout
include _includes/___
block content
  begin jade html
    +nameOfMixin(mixinParameter)
      each item in items
        h4= item.name
          p This item is rated #{item.rating}


          // ALTERNATE WAYS TO GET A REVIEW SUBDOC BY ITS ID
          idOfReview = req.params.reviewid;
          console.log(idOfReview); // SUCCESS !!!
          // review = location.reviews[0]; // BY INDEX SUCCESSFUL
          // review = location.reviews.findOne({'id': idOfReview}); // FAIL "NOT A FUNCTION"
          // review = location.reviews.filter(function(review) {
          //   return review.id === idOfReview;
          // }).pop(); // UNDEFINED

          // User = Loc,
          // user = location instance of Loc
          // model.findOne takes args for { 'subdocfield.subdocfield': value } and a callback
          Loc.findOne({'reviews.id': idOfReview}, function(err, desiredReview){
            if(err) {
              console.log(err);
            } else {
              review = desiredReview;
            }
          }); // fail UNDEFINED!

          // TRY RENAMING FIELD TO _ID (THEN I CAN USE .ID!!! ) https://docs.mongodb.com/v3.0/reference/operator/update/rename/

          // OR ANOTHER QUERY METHOD
          // TEST FOR SUCCESFUL REVIEW OBJECT:
          console.log('review object:' + review); // NULL!!!!

          test it with these location and review ids:
           // 571e4a7a653bcfb5074123e1/reviews/571e4b36653bcfb5074123e2
           // 571e52f8653bcfb5074123e3/reviews/571e5406653bcfb5074123e4





module.exports.locationsListByDistance = function(req, res){
 var lng = parseFloat(req.query.lng);
 var lat = parseFloat(req.query.lat);
 var point = {
   type: "Point",
   coordinates: [lng, lat]
 };
 //set geoOptions equal to object
 var geoOptions = {
   spherical: true,

   // is the getRads method broken? hard code value
   maxDistance: 1000000,

   // maxDistance: theEarth.getRadsFromDistance(20),
   num: 10
 };
 // use model to query for nearby location docs
 // push custom results onto locations array to return
 Loc.geoNear(point, geoOptions, function(err, results, stats){
   // array to hold objects to return
   var locations = [];

   // can we log an object we know we have?
   var testObject = {
     key: 'value'
   };
   console.log('results: ' + results);
   console.log('stats:' + stats);
   console.log('testObject:' + testObject);


   // hard code objects instead of results to see it iteration forEach working?
   var resultsX = [{
     obj: {name: 'text name'}
   },{
     obj: {name: 'test name2'}
   }];

   // forEach loop thru "docs" to build each custom objects
   // geoNear returns docs with a dis and an obj element
   resultsX.forEach(function(doc){
     locations.push({
       distance: theEarth.getDistanceFromRads(doc.dis),
       name: doc.obj.name,
       address: doc.obj.address,
       rating: doc.obj.rating,
       facilities: doc.obj.facilities,
       _id: doc.obj._id
     }); // end .push
   }); // end .forEach
   console.log('locations: ' + locations);
   sendJsonResponse(res, 200, locations);
 }); // end geoNear
}; // end locationsListByDistance
