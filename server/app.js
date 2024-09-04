const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost:27017/crmDB")

const userSchema = mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema);

app.get('/', (req, res) => {
    console.log("Hello!");
})

app.post("/login", (req, res) => {

})

app.post('/reg', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({
        email: email,
        password: password
    })

    newUser.save().then(() => {
        console.log("INSERTED");
    });

})

app.listen(5000, (req, res) => {
    console.log("APP IS LISTENING ON PORT 5000");
})