const mongoose = require('../mongo')
const {Schema,model} = mongoose
const mongooseValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    name: {
      type: String,
      default: ''
    },
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
    grade:String,
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }],
    likes: Array,
    email: {
      type: String
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    resetPass:{
      type: String,
      default: ''
    }

})
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.passwordHash;
        delete ret.resetPass;

    }
})
userSchema.plugin(mongooseValidator)
const User = model('User',userSchema)
module.exports= User