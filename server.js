const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs')
const logger = require('morgan');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config('./.env');
const port = process.env.PORT

/**
 * App set up
 */

mongoose.connect(process.env.LOCAL_MONGO)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log('Could not connect to DB', err)
        process.exit(1);
    })

/**
 * middlewares
 */


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
app.use(logger('tiny'));





/**
 * ROUTES
 */


app.use('/api/auth', authRoutes)


app.get('/proxy-test', (req, res) => {
    res.send('talking to the API server')
})

//serve frontend if not an api call
app.all('*', (req, res) => {
    const frontEndPath = path.join(__dirname, '..', 'frontend', 'build', 'index.html')
    if (fs.existsSync(frontEndPath)) {
        res.sendFile(frontEndPath)
    }else{
        res.sendStatus(404)
    }
})


    /**
     * Errors
     */

    app.use((err, req, res, next) => {
        if (err) {
            console.log(err.message);
            res.send(err.message)
        }
    })

    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    });



