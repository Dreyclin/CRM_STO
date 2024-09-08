const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

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

const clientSchema = mongoose.Schema({
    name: String,
    phoneNumber: [String],
    car: {
        brand: String,
        model: String,
        number: String
    },
    personalDiscount: Number
})
const recordSchema = mongoose.Schema({
    clientId: String,
    car: String,
    carNumber: String,
    description: String,
    date: Date,
    duration: Number,
    status: String
})

const autoServiceSchema = mongoose.Schema({
    records: String,
    clients: String
})

const User = mongoose.model("User", userSchema);
const Record = mongoose.model("Record", recordSchema);
const Client = mongoose.model("Client", clientSchema);

app.get('/', (req, res) => {
    console.log("Hello!");
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Неверный логин/пароль или вы не зарегистрированы' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token, user: { id: user._id, email: user.email } })
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

app.post('/checkAuth', async (req, res) => {
    let token;
    console.log('Authorization header:', req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const user = await User.findById(req.user.id).select('-password');
        const { email, id } = user;
        res.json({ message: 'Доступ разрешен', user: { id: id, email: email } });
    } catch (err) {
        return res.status(401).json({ message: 'Неверный токен' });
    }
})

app.post('/reg', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if (user) {
        res.status(400).json({ message: "Пользователь уже существует!" })
    } else {
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPass
        })

        await newUser.save()

        res.status(200).json({ message: "Пользователь успешно зарегистрирован" })
    }



})

app.listen(5000, (req, res) => {
    console.log("APP IS LISTENING ON PORT 5000");
})