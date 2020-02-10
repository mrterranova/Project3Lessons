//import following
const express = require("express");
const morgan = require("morgan");
// const cors = require("cors"); 
const bodyParser = require("body-parser")
const mongoose = require("mongoose"); 
const routes = require("./routes")

require('dotenv').config()

//express function
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


//connect to db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser : true,
    useFindAndModify: false, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => console.log('DB connected'))
.catch(err => console.log('DB Connection err', err))

//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors()); 

app.use(routes)

//PORT 
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`You are listening on PORT ${PORT}`)
})