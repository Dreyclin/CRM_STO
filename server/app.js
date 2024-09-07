const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

app.post('/login', (req, res, next) => {
    console.log(res);
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        if (!user) {
            return res.status(401).send({ message: 'Неправильный логин или пароль' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Ошибка входа' });
            }
            return res.status(200).json({ message: 'Вход успешен', user, isAuthed: true });
        });
    })(req, res, next);
});

// try {
//     const user = await User.findOne({ email: email })
//     if (user) {
//         const hashedPassword = user.password
//         console.log(hashedPassword);
//         const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
//         if (isMatch) {
//             console.log("CONGRATS!");
//         } else {
//             console.log("Failed!");
//         }
//     } else {
//         console.log("No such a user!");
//     }
// } catch (error) {
//     console.log(error);
// }

app.post('/reg', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

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