const Mongoose = require('mongoose')

const thingSchema = new Mongoose.Schema({    
    _id: {
        type: Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    owner: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

thingSchema.statics.add = async function (title, body, owner) {
    if (!title || !body || !owner) {
        throw Error('missing owner, title or body')
    }
    const newThing = await this.create({ title, body, owner })
    return newThing
}

thingSchema.statics.getAll = async function () {  
    const things = await this.find()
    return things
}

thingSchema.statics.getAllByOwner = async function (owner) {  
    const things = await this.find(owner)
    return things
}

thingSchema.statics.getbyId = async function (_id) {  
    const thing = await this.findOne(_id)
    return thing
}

thingSchema.statics.delete = async function(_id){
    if(!_id){
        throw Error('missing _id')
    }
    await this.deleteOne({_id})
}

module.exports = Mongoose.model('Thing', thingSchema)