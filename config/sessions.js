const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoStore = new MongoStore({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
    ttl: 14*24*60*60,
    autoRemove: 'native',
})

module.exports = session({
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1000*60*60*24},
    resave: false,
    store: mongoStore,      
    saveUninitialized: true    
})
