const mongoose = require('../mongo')
const {Schema,model} = mongoose

const postSchema = new Schema({
    tags: Array,
    date: Date,
    imgSrc: String,
    likesId: Array,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  })
postSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})
const Post = model('Post',postSchema)
module.exports= Post