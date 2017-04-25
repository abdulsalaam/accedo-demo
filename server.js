var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var port        = process.env.PORT || 8888;


cors = require('./cors');
app.use(cors());

/*Body parser*/
//app.use(express.bodyParser());

app.use(bodyParser.urlencoded({
  	extended: true
}));

app.use(express.static( __dirname + '/public'));
/*Initialize sessions*/
app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

/*Initialize Passport*/
app.use(passport.initialize());
app.use(passport.session());

/*Database connection - MongoDB*/

//Created from the command earlier. Ensure this is done on the first_db instance
var username = 'admin';
var password = 'accedodemo';

var dbHost = 'localhost';
var dbPort = '27017';
var database = 'accedodemo';

var url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database;
console.log('mongodb connection = ' + url);

mongoose.connect(url, function(err) {
    if(err) {
        console.log('connection error: ', err);
    } else {
        console.log('connection successful');
    }
});

/***********
Declare all models here
***********/

//User model
/*var UserSchema = new mongoose.Schema({
	username:  {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    }
},{strict: true});
*/
//var User = mongoose.model('user', UserSchema);
var User        = require('./app/models/user'); // get the mongoose model


/***********
All routes go below
***********/

var bcrypt = require('bcrypt-nodejs'); //Should be placed on top

app.use(express.static( __dirname + '/public'));

app.get('/', function (req, res, next) {
    res.sendFile( __dirname + '/index.html');
});

app.get('/register', function (req, res, next) {
    res.sendFile( __dirname + '/register.html');
});

app.get('/home', loggedIn, function (req, res, next) {
    res.sendFile( __dirname + '/home.html');
});

app.get('/video', loggedIn, function (req, res, next) {
    res.sendFile( __dirname + '/video.html');
});

app.get('/changepassword', loggedIn, function (req, res, next) {
    res.sendFile( __dirname + '/changepassword.html');
});

app.get('/user', loggedIn, function (req, res, next) {
    User.findById({ _id: req.user._id }, function(err, user) {
    	return res.json(user);
  	});
});

app.get('/logout', function (req, res, next) {
    req.logout();
  	res.redirect('/');
});

app.post('/login', passport.authenticate('local'),
    function(req, res) {
		//res.json({ message : "User successfully logged in!"});
        res.redirect('/home');
});

/**********
The login logic where it passes here if it reaches passport.authenticate
**********/

passport.use(new LocalStrategy(
	function(username, password, done) {
		User.findOne({ username: username }, function (err, user) {
			//console.log('userrrr:',user);
	        if(user !== null) {
	            var isPasswordCorrect = bcrypt.compareSync(password, user.password);
	            if(isPasswordCorrect) {
	            	console.log("Username and password correct!");
	            	return done(null, user);
	            } else {
	            	console.log("Password incorrect!");
	            	return done(null, false);
	            }
	        } else {
	        	console.log("Username does not exist!");
	            return done(null, false);
	        }
    	});
	}
));

/**********
Serialize and Deserialize here for passport.authenticate
**********/

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    User.findById({_id: user._id}, function(err, user) {
    	done(err, user);
  	});
});


app.post('/register', function (req, res, next) {
	var password = bcrypt.hashSync(req.body.password);
	req.body.password = password;
	if(password != '') { 
    User.create(req.body, function(err, saved) {
        if(err) {
            console.log(err);
            res.json({ message : err });
        } else {
            //res.redirect('/home');
            res.json({ message : "User successfully registered!"});
        }
    });
	}
});


app.post('/changepassword', loggedIn, function (req, res, next) {
	var oldpassword = req.body.oldpassword;
	var newpassword = bcrypt.hashSync(req.body.newpassword);
	//req.body.password = password;

	User.findById({ _id: req.user._id }, function(err, user) {
		//console.log('old password:',oldpassword);
		//console.log('new password:',newpassword);
		if(user !== null) {
	            var isPasswordCorrect = bcrypt.compareSync(oldpassword, user.password);
	            if(isPasswordCorrect) {
	            	console.log("password correct!");
					
					User.update({_id:user._id},{password:newpassword},function(err) {
					if (err) {
								console.error(err);
								res.json({ message : err });
					} else {
						 return res.json({ message : "password successfully changed!"});
						}
					})
	            } else {
	            	console.log("Password incorrect!");
	            	 return res.json({ message : "Password incorrect!"});
				}
	        } else {
	        	console.log("Username does not exist!");
	           return res.json({ message : "Username does not exist!"});
	        }
	});
	 
	 /*User.findOne({ password: oldpassword }, function(err, user) {
		 console.log('uuuuuu:',user);
		 
		 if(err) {
            console.log(err);
            res.json({ message : err });
        } else {
           res.json({ message : "User password changed successfully!"});
        }
		 
  	});*/
	
    /*User.create(req.body, function(err, saved) {
        if(err) {
            console.log(err);
            res.json({ message : err });
        } else {
            res.json({ message : "User successfully registered!"});
        }
    });*/
});





app.post('/delete', loggedIn, function (req, res, next) {
    User.findOneAndRemove({ _id: req.body._id }, function(err, user) {
    	if(err) {
    		console.log(err);
            return res.json({ message : err });
    	} else {
    		return res.json({ message : "User successfully deleted!"});
    	}
  	});
});




function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + " - " + hour + ":" + min + ":" + sec;

}

/*
app.listen(port, '0.0.0.0', function() {
    console.log('Server running at port ' + port);
});
*/
app.listen(port, function() {
    console.log('Server running at port ' + port);
});
module.exports = app;
