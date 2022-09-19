const express = require('express');
const mongoose = require('mongoose');
const Url = require('./models/url');
const morgan = require('morgan');
const shortid = require('shortid');
const validUrl = require('valid-url')

const app = express()

const main = async () => {
    const db = await mongoose.connect('mongodb://localhost/url-shortener');
    console.log('Connected to MongoDB');
    app.listen(process.env.port  || 3000, () => {
        console.log('Listening on port 3000');
    });
}
main();

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.get('/', async (req, res) => {
    Url.find({}, (err, urls) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { urls: urls });
        }
    });
})


app.post('/shorten', async (req, res) => {
    const longUrl = req.body.longUrl;
    console.log(longUrl);
    const shortCode = shortid.generate();
    const shortUrl = `http://localhost:3000/${shortCode}`;
    const url = new Url({longUrl, shortUrl, shortCode});
    url.save();
    res.redirect('/');
})

app.get('/:shortCode', async (req, res) => {
    const shortCode = req.params.shortCode;
    const url = await Url.findOne({ shortCode: shortCode });
    if (url) {
        res.redirect(url.longUrl);
    } else {
        res.redirect('/');
    }
})
