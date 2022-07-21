const express = require('express');
const app = express();
const path = require('path')
const logger = require('morgan');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose')
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
 * App set up
 */


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(require('./config/sessions'))
app.use(express.static(path.join(__dirname, 'frontend','build')));
app.use(logger('tiny'));


/**
 * ROUTES
 */


app.use('/api/auth', authRoutes)


app.get('/proxy-test',(req,res)=>{
    res.send('talking to the API server')
})

//serve frontend if not an api call
app.get('*', (req,res)=>{ res.sendFile(path.join(__dirname,'frontend','build','index.html'))})

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



