const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const {checkUser, requireAuth} = require('./middleware/auth');


mongoose
  .connect(
    "mongodb+srv://Ramuchoi:mezaJp7X@cluster0.wtjpcil.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            
    optionSuccessStatus:200
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;