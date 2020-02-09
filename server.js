//import following
const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 
const bodyParser = require("body-parser")
const mongoose = require("mongoose"); 
const path = require("path")

require('dotenv').config()

//express function
const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }
  router.use(function(req, res) {
      res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

//connect to db
mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useNewUrlParser : true,
    useFindAndModify: false, 
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => console.log('DB connected'))
.catch(err => console.log('DB Connection err', err))

//important routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const lessonRoutes = require('./routes/lessons')
const notesRoutes = require('./routes/notes')

//app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors()); 


//middleware
app.use('/api', authRoutes);
app.use("/api", userRoutes);
app.use("/api", lessonRoutes);
app.use("/api", notesRoutes);



//PORT 
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`You are listening on PORT ${PORT}`)
})