var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/contact', function(req,res,next){
  var db = req.db;
  var collection = db.get('contacts');
  collection.find({}, {"sort" : [['name.last', 'asc']]}, function(e,docs){
    res.render('contact', {"contacts" : docs });   
  });
});

router.post('/newcontact', function(req, res, next){
  var db = req.db;

  var firstname = req.body.addfirstname;
  var lastname = req.body.addlastname;
  var title = req.body.addtitle;
  var company = req.body.addcompany;
  var email = req.body.addemail;
  var wheremet = req.body.addwheremet;
  var date = req.body.adddate;
  var comments = req.body.addcomments;

  var collection = db.get('contacts');

  collection.insert({
    "name" : {"first": firstname, "last": lastname},
    "title" : title,
    "company" : company,
    "email" : email,
    "wheremet" : wheremet,
    "date" : date,
    "comments" : comments
  }, function(err, doc){
      if (err) {
        res.send("Something went wrong with the insert.");
      }
      else {
        res.location("contact");
        res.redirect("contact");
      }
    });
});

router.post('/edit/:ID', function(req,res){
  var db = req.db;
  var collection = db.get('contacts');
 
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var company = req.body.company;
  var title = req.body.title;
  var email = req.body.email;
  var date = req.body.date;
  var whereMet = req.body.wheremet;
  var comments = req.body.comments;

  collection.update({_id: req.params.ID},{
    "name":{"first": firstName, "last": lastName},
    "company": company,
    "title": title,
    "email": email,
    "wheremet": whereMet,
    "date": date,
    "comments": comments
  }, function(err){
    if(err){
      res.send(err);
    }
    else {
      res.location("/contact");
      res.redirect("/contact");
    }
  });
});


router.post('/delete/:ID', function(req,res){
  var db = req.db;
  var collection = db.get('contacts');
  collection.remove({_id: req.params.ID}, {justOne: true}, function(err){
    if(err){
      res.send(err);
    }
    else {
      res.location("/contact");
      res.redirect("/contact");
    }
  });
});

module.exports = router;
