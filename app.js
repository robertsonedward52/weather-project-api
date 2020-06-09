const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true})); 

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", (req, res) => {
    // console.log(req.body.cityName);
    
const query = req.body.cityName;
const apiKey = "439d4b804bc8187953eb36d2a8c26a02";
const unit = "metric";
const url = "https://openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

https.get(url, function(response) {
    console.log(response.statusCode)

    response.on("data", (data) => {
    const weatherData = JSON.parse(data)
    // console.log(weatherData);
    
    const temp = weatherData.main.temp

    const weatherDescription = weatherData.weather[0].description
    const icon  = weatherData.weather[0].icon
    const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    res.write("<p> The weather is currently overcast clouds " + weatherDescription + "</p>");
    res.write("<h1>The temperature in " + query + " is " + temp + "degrees Celcius.</h1>");
    res.write("<img src=" + imageURL +">");
    res.send();
    // console.log(weatherDescription);
    // console.log(temp);
    // const myObj = {
    //     name: "Edward",
    //     age: 23,
    //     country: "liberia"
    // }
    // console.log(JSON.stringify(myObj));
    })
})


})

app.listen(3000, function() {
    console.log("The server is running on port 3000");
});
