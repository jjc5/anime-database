const Favorite = require('../models/favorite.js');
const User = require('../models/user.js');
const router = require('express').Router();
const auth = require('../middleware/auth.js');

//CREATE
//@route POST api/favorites
//@desc create a favorite
//@access private
router.post('/', auth, async(req, res) => {
  try{
    const createdFavorite = await Favorite.create(req.body)
    const updatedUser = await User.findByIdAndUpdate(req.body.user, {$addToSet: { favorites: createdFavorite._id }}, {new: true});
    res.status(200).json(createdFavorite)
  }catch(error){
    console.error(error)
      res.status(400).json({ message: error.message })
  }
})

/*Index*/
    router.get('/', async (req, res) => {
      try{
        const foundFavorites = await Favorite.find({})
        res.status(200).json(foundFavorites)
      }catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
      }
    })

/*Show*/
    router.get('/:id', async (req, res) => {
      try{
        const foundFavorite = await Favorite.findById(req.params.id)
        res.status(200).json(foundFavorite)
      }catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
      }
    })

//UPDATE
  /*update*/
    router.put('/:id', async (req, res) => {
      try{
        const updatedFavorite = await Favorite.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedFavorite)
      }catch(error){
        console.error(error);
        res.status(400).json({ message: error.message })
      }
    })
//DELETE
  router.delete('/:id', async (req, res) => {
    try{
      const deletedFavorite = await Favorite.findByIdAndDelete(req.params.id)
      res.status(200).json(deletedFavorite)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

  module.exports = router;
