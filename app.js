var express = require('express');
var swig = require('swig');
var logger = require('morgan');
var bodyParser = require('body-parser');
var sass = require('node-sass-middleware');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults({cache: false});

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/bower_components', express.static(__dirname + '/bower_components'))

app.use(require('./routes'));

app.use(
  sass({
    src: __dirname + '/assets', //where the sass files are 
    dest: __dirname + '/public', //where css should go
    debug: true
  })
);


app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error-template', {
        message: err.message,
        error: err
    });
});

var port = 3000;
app.listen(port, function () {
	console.log('Server on port', port, 'awaiting orders');
});





