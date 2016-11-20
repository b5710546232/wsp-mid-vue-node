import mongoose from 'mongoose'
let Schema = mongoose.Schema

let bookStoreSchema = new Schema({
  book_id:{
    type:String,
    required:true,
  },
  isbn:{
    type:String,
    required:true,
  },
  book_name:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  author:{
    type:String,
    required:true,
  }

})

module.exports = mongoose.model('BookStore',bookStoreSchema)
