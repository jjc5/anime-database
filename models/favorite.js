const { Schema, model} = require('mongoose');

const favoriteSchema = new Schema ({
  title: {type: String, required: true},
  user: {type: Schema.Types.ObjectId, ref: "User"}
});

module.exports = model('Favorite', favoriteSchema)
