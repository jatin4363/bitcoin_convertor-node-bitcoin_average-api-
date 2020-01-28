const express = require("express");
const app = express();
const request = require("request");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    var crypto = req.body.crypto;
    var fiat = req.body.fiat;
    var amount = req.body.amount;

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }

    }
    request(options, function(error, response, body) {
        var data = JSON.parse(body); //converting JSON into a JS object
        var price = data.price;
        var currentDate = data.time;
        // to send multiple things we use res.write and then res.send
        res.write("<p>The current date is : " + currentDate + "</p>");
        res.write("<h1>The price for " + amount + " " + crypto + " is " + price + fiat + " </h1>");
        res.send();
    })

})



app.listen(3000, function() {
    console.log("Server listening at http://localhost:3000");
});