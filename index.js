const helmet = require('helmet');
const compression = require('compression');
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore= require("connect-mongo")
const { body }= require('express-validator')
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const bcrypt=require('bcryptjs');
const cookieParse= require('cookie-parser');
const multer  = require('multer');
const bodyParser = require('body-parser')


//I love to use 404 since I love gfl


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(helmet());
app.use(compression()); 


mongoose.connect('enter your mongo', {useNewUrlParser: true, useUnifiedTopology: true});
//connection checker
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.use(cookieParse())
app.use(session({
  secret: 'jessus',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'enter your mongo',
    ttl: 86400,
    autoRemove: 'native'
})
  }))

const UserSchema = new mongoose.Schema({
  blogName: {
    type: String,
  },
  textD: {
    type: String,
  },
  textB: {
    type: String,
  },
  blogLink: {
    type: String,
  },
  imgPath: {
    type: String
  }
});



const userMes = mongoose.model("user", UserSchema);

const userAdd= new mongoose.Schema({
  username:{
    type: String,
  },
  password: {
    type: String
  }
})

const userName = mongoose.model("userName", userAdd);

var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './assets');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , file.originalname);   
  }
});
var upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) { 
       return cb(new Error('Please upload a Image'))
     } 
    cb(null, true);
  },
  limits: { fieldSize: 10 * 1024 * 1024 }
})

app.use('/Blog/*', express.static('public'));
app.use('/', express.static('public'))
app.get('/Login', function(req,res){
  if(req.session.user){
    res.redirect('/')
  }else{
    res.sendFile(path.join(__dirname, './public', 'index.html'))
  }
})

app.post('/signIn', body('use').isLength({min: 3, max:20}).escape() && body('pass').isLength({ min: 7, max:20 }).matches('[0-9]').matches('[A-Z]').matches('[a-z]').trim().escape(), async function(req, res){
try{
const file= await userName.findOne({"username":`${req.body.use}`}) 
if(file !== null) {
  const pass= bcrypt.compare(req.body.pass, file.password)
  if(pass){
    req.session.user={
      name: req.body.use
    }
  }
}

res.redirect('/')

}catch(err){
res.status(404)
}
})

app.post("/sendMessage",body('blogText').escape() && body('blogDescrip').escape() && body('blogName').escape() && body('blogGithub').escape() && upload.single('blogImage'), async function(request, response) {
  try {
    if(request.session.user.name != 'origami69'){
      response.redirect('/')
    }else{
      const str = request.body.blogName
      const noWhiteSpace = str.replace(/\s/g, '');
      const newMess = new userMes({
        blogName: noWhiteSpace,
        textD: request.body.blogDescrip,
        textB: request.body.blogText,
        blogLink: request.body.blogGithub,
        imgPath: request.file.path
      });
      await newMess.save();
      response.redirect('/')
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/serveMe', function(req,res) {
  userMes.find({}).then((data)=>{
    res.send(data)
  }).catch((error)=>{console.log(error)})
})
app.get('/bruh/:tag', function(req,res) {
  userMes.find({blogName:req.params.tag}).then((data)=>{
    res.send(data)
  }).catch((error)=>{console.log(error)})
})

app.get('/assets/:fileName', function (req, res) {
  const filePath = req.params.fileName
  res.sendFile(path.join(__dirname, './assets', `${filePath}`));
});

http.listen(PORT, () => console.log(`server running at http://localhost:${PORT}/`));

  