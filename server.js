/**
 * Created by zihanwang on 8/21/16.
 */
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/dist' ));

app.get('/1', function (req, res) {
    res.send('Hello World');
});

app.get('/*', function(req,res)
{
    res.sendFile(__dirname + '/app/index.html');
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
