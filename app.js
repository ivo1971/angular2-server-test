var path = require("path");
var application_root = __dirname;
var bodyParser = require("body-parser");
var express = require("express");
var http = require("http");
var app = express();
var server = http.createServer(app);
var port = process.env.PORT || 4242;

// Config
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(application_root, "../../git-bm")));

// API
app.get('/api', function (req, res) {
    console.log("Get '/api'");
    var resData = {data: 'BM API is running'};
    res.json(resData);
});

app.get('/api/processGroups', function (req, res) {
    console.log("Get '/api/processGroups'");
    var token = req.get('AuthenticationToken');
    console.log("Get '/api/processGroups' token: [" + token + "]");
    if(token == "") {
        console.log("Get '/api/processGroups' no token");
        res.status(401).send('Not authenticated');
    } else {
        //req.params.id
        console.log("Get '/api/processGroups' token OK");
        var resGroups = [
            {groupId: 1, description: "BM API  1", stateMin:  1, stateMax: 21, timeScheduled:  Math.floor(Date.now() / 1000), timeFinished: 31},
            {groupId: 2, description: "BM API  2", stateMin:  2, stateMax: 22, timeScheduled:  Math.floor(Date.now() / 1000), timeFinished: 32},
            {groupId: 3, description: "BM API  3", stateMin:  3, stateMax: 23, timeScheduled:  Math.floor(Date.now() / 1000), timeFinished: 33},
            {groupId: 4, description: "BM API  4", stateMin:  4, stateMax: 24, timeScheduled:  Math.floor(Date.now() / 1000), timeFinished: 34},
            {groupId: 5, description: "BM API  5", stateMin:  5, stateMax: 25, timeScheduled:  Math.floor(Date.now() / 1000), timeFinished: 35},
        ];
        var resData = {data: resGroups};
        res.json(resData);
    }
})

app.post('/api/auth/SignIn', function (req, res) {
    console.log("Get '/api/auth/SignIn'");
    var resSignIn = {
        signedIn: true,
        token: Math.floor(Date.now() / 1000),
    };
    var resData = {data: resSignIn};
    res.json(resData);
});

app.post('/api/auth/SignOut', function (req, res) {
    console.log("POST '/api/auth/SignIn'");
    var resSignOut = {signedOut: true};
    var resData = {data: resSignOut};
    res.end(resData);
});

// Static files with Angular-redirect
app.get('/*', function (req,res) {
    console.log("Get static file: ");
    console.log(req.originalUrl);
    var fileExt = req.originalUrl.split('.').pop();
    if(("js" === fileExt) || ("htm" === fileExt) || ("html" === fileExt)) {
        console.log(" --> file ");
        res.sendFile(path.resolve(path.join(application_root, "../../bm")));
    } else {
        console.log(" --> resolve ");
        res.sendFile(path.resolve(path.join(application_root, "../../bm"), path.join(application_root, "../../bm/index.html")));
    }
    console.log("\n");
});

// Launch server
app.listen(port);
