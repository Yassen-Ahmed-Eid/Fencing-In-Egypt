const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const url = require('url');  
const app = express();
const config = require("./config.json")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
const port = 8443;

app.get('/login', (req, res) => {
    res.sendFile("login.html", { root: __dirname })
});

app.get('/signup', (req, res) => {
    res.sendFile("signup.html", { root: __dirname })
})

app.post('/login', async (req, res) => {
    axios.post(config.loginApiLink, {
        email: req.body.emailLogin,
        password: req.body.passwordLogin,
        job: "login"
    }).then(data => {
        if(data.data == "right") {
            res.sendFile("main.html", { root: __dirname })
        } else if (data.data == "wrong") {
            res.sendFile("loginfailed.html", { root: __dirname })
        }
    })
    .catch((err) => {
        res.sendFile("error.html", { root: __dirname })
    })
});

app.post('/signup', (req, res) => {
    axios.post(config.signupApiLink, {
        username: req.body.username,
        email: req.body.emailLogin,
        password: req.body.passwordLogin,
        job: "signup",
        phonenumber: req.body.phonenumber,
        Government: req.body.Government,
        Academy: req.body.Academy,
        Age: req.body.Age,
        file: req.body.file,

    }).then(data => {
        if (data.data == "email is exist") {
            return res.sendFile("signupexist.html", { root: __dirname })
        }
        res.sendFile("main.html", { root: __dirname })
    })
    .catch((err) => {
        res.sendFile("error.html", { root: __dirname })
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});