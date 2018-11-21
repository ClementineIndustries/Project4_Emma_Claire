// Main script for Emma and Claire's Project 4

// declare app object
const myApp = {};

// store our api keys for weather and google places
myApp.weatherKey = "5a94fd0eec1f352b4f9876ecb51a88a9";
myApp.googleKey = "AIzaSyAtUxpG10DW19jF5_OC6Q5rfT3PO5Nzmos";

// tell our autoComplete input to actually Autocomplete in the specified input element "autoComplete"
myApp.autoCompInput = new google.maps.places.Autocomplete(document.getElementById("autoComplete"));

// use Google event listener to track changes in the input element that the user enters text
google.maps.event.addListener(myApp.autoCompInput, "place_changed", function () {
    let place = myApp.autoCompInput.getPlace();
    console.log("lat:", place.geometry.location.lat());
    let lat = place.geometry.location.lat();
    console.log("lng", place.geometry.location.lng());
    let lng = place.geometry.location.lng();
});


// prevent the default on form submit and get value of input
myApp.getInput = function(){
    $("form").on("submit", function(event){
        event.preventDefault();
        // send the value of the search input to getCoords
        myApp.input = $("#autoComplete").val();
    });
};

// ----- Weather app API work begins here -----
// Set date to variables
myApp.day = 20;
myApp.month = 11;
myApp.year = 2017;


myApp.setLatLong = function () {
    const latitude = 43.6532;
    const longitude = 79.3832;
    const units = "ca";
    const startDate = new Date(`${myApp.year}, ${myApp.month}, ${myApp.day}`).getTime() / 1000;

    myApp.getTemp(latitude, longitude, units, startDate);
};

myApp.getTemp = function(lat, long, u, t){
    $.ajax({
        url: `https://api.darksky.net/forecast/${myApp.weatherKey}/${lat},${long},${t}`,
        dataType: "jsonp",
        method: "GET",
        data:{
            format:"jsonp",
            key: myApp.weatherKey,
            units: u,
            timezone: "Canada/Eastern",
        }
    }).then(res => {
        console.log(res);
    })
}

myApp.init = function(){
    myApp.getInput();
    myApp.setLatLong();
};

$(function(){
    myApp.init();
});