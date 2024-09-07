const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const env = require('dotenv');

const bcrypt = require('bcrypt')
const salt = 10;

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

app.post('/login', async (req, res) => {
    console.log(res);
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(400).json({ message: 'Неверный логин или пароль' });
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.json({token, user: {id: user._id, email: user.email}})
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

app.post('/reg', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({email: email});
    
    if(user) {
        res.status(400).json({message: "Пользователь уже существует!"})
    }

    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new User({
        email: email,
        password: hashedPass
    })

    newUser.save().then(() => {
        console.log("INSERTED");
    });

})

app.listen(5000, (req, res) => {
    console.log("APP IS LISTENING ON PORT 5000");
})