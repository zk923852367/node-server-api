
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index.js');
var bodyParser = require('body-parser');  
var methodOverride = require('method-override');
var expressLayouts = require('express-ejs-layouts');
var app = module.exports = express();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(methodOverride('_method'));
//app.use(routes); //自动解析url

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

routes(app)
if(process.env.NODE_ENV === 'production') {
  app.use(express.errorHandler());
} else if(process.env.NODE_ENV === 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

const server = app.listen(3000, 'localhost', function () {
  const host = server.address().address
  const port = server.address().port
  console.log("Express server listening on " + port + " in " + host +", 访问地址为 http://localhost:" + port);
})

