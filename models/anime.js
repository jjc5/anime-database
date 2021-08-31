const { Schema, model } = require('mongoose');

const animeSchema = new Schema({
  title: {type: String, required: true}
})

module.exports = model('Anime', animeSchema);
