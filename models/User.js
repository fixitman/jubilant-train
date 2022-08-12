const Mongoose = require('mongoose')

const userSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hashedPW: {
        type: String,
        required: true,
    },
    refreshToken:{
        type: String,
        required: false
    }
    
})

userSchema.virtual('name').get(function(){
    return `${this.firstName} ${this.lastName}`
})

module.exports = Mongoose.model('User', userSchema)