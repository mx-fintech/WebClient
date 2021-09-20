require("dotenv").config()

const express = require("express")
const cors = require("cors")
const compression = require("compression")
const session = require('express-session')
const path = require('path')
const exphbs  = require('express-handlebars')
const Handlebars = require('handlebars')
const SM = require("./Config/SessionManager.Config")

const app = express()
const router = express.Router()

//Imports Route Files
const UserRoutes = require('./Routes/Users.Routes')(router, SM)

//Session Manager
app.use(session(SM.Options()))
app.set('trust proxy', 1) // trust first proxy

app.use(express.static(path.join(__dirname, '/Public')))
app.use(compression())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//Set View Engine
app.use(compression())
  
app.set("views",path.join(__dirname,'Views'))
app.engine('handlebars',exphbs({
    defaultLayout:'template',
    layoutsDir: __dirname + '/Views/layouts',
    partialsDir: __dirname + '/Views/partials'
}))

app.set('view engine','handlebars')

app.use('/', UserRoutes)

Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));

Handlebars.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

Handlebars.registerHelper('grt_than', function (a, b, options) {
    if (a.length > b) { return options.fn(this); }
    return options.inverse(this);
});
Handlebars.registerHelper('index_of', function(context,ndx) {
    return context[ndx];
  });
Handlebars.registerHelper('each_upto', function(ary, max, options) {
    if(!ary || ary.length == 0)
        return options.inverse(this);

    var result = [ ];
    for(var i = 0; i < max && i < ary.length; ++i)
        result.push(options.fn(ary[i]));
    return result.join('');
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});
  

Handlebars.registerHelper('formatCurrency', function(value) {
    if(value && value != null && value != "" && value != typeof undefined){
        return "MK"+value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }else{
        return ''
    }
})

Handlebars.registerHelper('valueFixed', function(value) {
    return value.toFixed(2);
});

Handlebars.registerHelper('dateFormat', function (date, options) {
    const formatToUse = (arguments[1] && arguments[1].hash && arguments[1].hash.format) || "YYYY-MM-DD"
    return moment(date).format(formatToUse);
});

app.listen(process.env.PORT, ()=>{
    console.log(">> ML-WebClient-SVC Running on Port %s",process.env.PORT)
})