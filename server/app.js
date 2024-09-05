const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const bcrypt = require('bcrypt')
const salt = 10;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb://localhost:27017/crmDB")

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const userSchema = mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model("User", userSchema);

app.get('/', (req, res) => {
    console.log("Hello!");
})

app.post('/login', (req, res, next) => {
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
            return res.status(200).json(user);
        });
    })(req, res, next);
});

app.post('/checkAuth', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
      } else {
        res.json({ authenticated: false });
      }
})

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