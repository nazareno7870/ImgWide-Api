const mongoose = require('../mongo')
const {Schema,model} = mongoose
const mongooseValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    name: String,
    passwordHash: String,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    follows: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }],
    picprof: String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }],
    likes: Array
})
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})
userSchema.plugin(mongooseValidator)
const User = model('User',userSchema)
module.exports= User