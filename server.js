var express = require('express');
var app = express();
var months = ['January', 'February', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.use(express.static(__dirname));
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
