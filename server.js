var express = require('express');
var app = express();
var months = ['January', 'February', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname));
app.get('/:time', function (req, res) {
    req.on('error', function (err) {
        console.error(err);
    });

    var time = req.params.time;
    var date = null;
    var value = Number(time);
    if (Number.isNaN(value)) {
        date = new Date(decodeURI(time));
    } else {
        date = new Date(value * 1000);
    }

    var obj = { 
        unix: Math.round(date.getTime()/1000.0), 
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
app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
});
