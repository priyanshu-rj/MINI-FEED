const express = require("express");
const app = express();

const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


//image upload 
const multer = require('multer');
const fs = require('fs');



app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/revise', { useNewUrlParser: true });



var reviseSchema = new mongoose.Schema({
    name: String,
    email:String,
    skill:String,
    age:Number,
    phn:Number,
    address:String,
    gender: String,
    //use for image 
    name1: String,
    data: Buffer,
    contentType: String
});

var reviseModel = mongoose.model('reviseNode', reviseSchema);


//image
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



app.post('/', upload.single('file'),  (req, res) => {
    // console.log(req.file);
    const username = req.body.username; 
    const Email = req.body.Email;
    const Skill = req.body.Skill;
    const Age = req.body.Age;
    const Address = req.body.Address;
    const gender = req.body.gender;
    const phn = req.body.Phn;
    
    console.log(username); 
    console.log(Age);
    var reviseSave = new reviseModel({
        name: username,
        email: Email,
        skill: Skill,
        age: Age,
        phn: phn,
        address: Address,
        gender: gender,
        //use for image 
        name1: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype
    });

    reviseSave.save(); 

    res.sendfile("conect.html");
 
});

app.get('/', (req, res) => {
    res.render('main');
})


app.get('/Home', async (req, res) => {
    const data = await reviseModel.find({}); 

    res.render('data', { databases: data });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
