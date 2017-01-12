var express = require('express');
var fs = require('fs');
var app = express();
app.use(express.static(__dirname));
/*app.get('/', function (req, res) {
    req.on('error', function (err) {
        console.error(err);
    });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.sendFile('index.html');
});*/

var months = ['January', 'February', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 'November', 'December'];
app.get('/:time', function (req, res) {
    req.on('error', function (err) {
        console.error(err);
    });
    var time = req.params.time;
    var date = null;
    if (Number.isNaN(time)) {
        date = new Date(Number(time));
    } else {
        date = new Date(decodeURI(time));
    }

    //res.writeHead(200, { 'Content-Type': 'application/json' });
    var obj = { 
        unix: date.getTime(), 
        natural: [
            months[date.getMonth()], 
            date.getDate() + ',', 
            date.getFullYear()
            ].join(' ')
    };
    if (!obj.unix) obj.natural = null;
    res.send(obj);
});
app.on('error', function (err) {
    console.error(err);
});
app.listen(8080);