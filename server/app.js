const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


app.get('/', (req, res) => {
    res.send("YEAAAAPIEEE");
})

app.listen(5000, (req, res) => {
    console.log("APP IS LISTENING ON PORT 5000");
})