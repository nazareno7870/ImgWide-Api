const mongoose = require('../mongo')
const {Schema,model} = mongoose

const tagSchema = new Schema({
    tag: String,
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }]
  })
tagSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
})
const Tag = model('Tag',tagSchema)
module.exports= Tag