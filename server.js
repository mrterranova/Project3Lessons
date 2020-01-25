// const express = require("express");
// const mongoose = require("mongoose");
// const routes = require("./routes");

// const bodyParser = require("body-parser");
// const passport = require("passport");

// const user = require("./routes/api/users");


// const app = express();
// const PORT = process.env.PORT || 3001;

// // Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(bodyParser.urlencoded ({
//   extended: false
// })
// );
// app.use(bodyParser.json())
// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }
// // Add routes, both API and view
// app.use(routes);

// // Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/thelessons"
// ). then( () => console.log("MongoDB successfully connected"))
// .catch( err => console.log(err))


// app.use(passport.initialize());

// require("./config/passport")(passport);

// app.use("/api/users", user)
// // Start the API server
// app.listen(PORT, function() {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });

// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const errorHandler = require('errorhandler');

// //Configure mongoose's promise to global promise
// mongoose.promise = global.Promise;

// //Configure isProduction variable
// const isProduction = process.env.NODE_ENV === 'production';

// //Initiate our app
// const app = express();

// //Configure our app
// app.use(cors());
// app.use(require('morgan')('dev'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret: 'passport', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


// require('./models/Users')
// require('./config/passport')
// app.use(require('./routes'))

// if(!isProduction) {
//   app.use(errorHandler());
// }

// //Configure Mongoose
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/thelessons');
// mongoose.set('debug', true);

// //Error handlers & middlewares
// if(!isProduction) {
//   app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// }

// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

// app.listen(, () => console.log('Server running on http://localhost:8000/'));

const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")

const users = require("./routes/api/users")

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false
  })
); 
app.use(bodyParser.json()); 

const db = require("./config/keys").mongoURI;

mongoose.connect( db, { useNewUrlParser: true })
  .then(()=> console.log("You are now connected"))
  .catch(err => console.log(err));

app.use(passport.initialize()); 

require("./config/passport")(passport)

app.use("/api/users", users);

const port = process.env.PORT || 3001; 
app.listen(port); 