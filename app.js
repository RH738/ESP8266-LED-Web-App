var mqtt = require('mqtt');
var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'));

var client = mqtt.connect('mqtt://m21.cloudmqtt.com', {port: 11218, username: 'ghfunvuw', password: 'cH-DvLyid9wc'});

client.on('connect', function () {
    client.publish('ESP_COLOR', 'nodejs connected');
    console.log('connected!');
});


app.post('/colorForm', function (req, res) {
    var color = req.body.color;
    if (color[0] === 'r') {
        client.publish('ESP_COLOR', 'r');
    }
    else {
        client.publish('ESP_COLOR', 'c' + color);
        console.log('c' + color);
    }
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" +"index.html");
})

app.get('/jscolor', function (req, res) {
    res.sendFile(__dirname + "/" + "jscolor.html");
})
port = process.env.PORT || 8080
app.listen(port)
console.log('Express server started on port %s', port)
