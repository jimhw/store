const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
  id: Number,
  name: String,
  address: String,
  latitude: Number,
	longitude: Number,
	category: String
})

mongoose.model('Store', StoreSchema)
