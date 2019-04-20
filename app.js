var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/myapp",{ useNewUrlParser: true });

app.set("view engine", "ejs");
//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
        });
        
        var Campground = mongoose.model("Campground", campgroundSchema);
        Campground.create(
            {
                name: "Prior Lake", 
                image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"
                
            }, function (err, campground){
                    if(err){
                    console.log(err);
                } else {
                    console.log("NEWLY CREATED CAMPGROUND: ");
                     console.log(campground);
                     }
                });
                
  var campgrounds = [
        {name: "Prior Lake", image: "https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg"},
        {name: "Mammoth Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
        {name: "Pea Pod Lake", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg"}

        ];
app.get("/", function(req, res){
 res.render("landing");
});

app.get('/campgrounds', function(req, res){
        res.render("campgrounds",{campgrounds:campgrounds});
});
app.post("/campgrounds", function(req, res){
    res.send("you hit the post route!!")
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   //redirect back to campgrounds page
   res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started!");
    
});