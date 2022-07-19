const express = require('express');
const path = require('path')
const createError = require('http-errors');
const logger = require('morgan');
const rootRoutes = require('./routes/rootRoutes');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose')
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser')

require('dotenv').config('./.env');
const port = process.env.PORT

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log('Could not connect to DB', err)
        process.exit(1);
    })


/**
 * Session set up
 */

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collection: 'session'
})
store.on('error', function (error) {
    console.log(error);
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    saveUninitialized: false,
    resave: false,
    store: store
}));


/**
 * App set up
 */

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(require('./config/sessions'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('tiny'));


/**
 * ROUTES
 */

app.use('/', rootRoutes)
app.use('/auth', authRoutes)


/**
 * Errors
 */

app.use((req, res, next) => {
    return next(createError(404, 'page not found'))
})

app.use((err, req, res, next) => {
    if (err) {
        console.log(err.message);
        res.send(err.message)
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});



