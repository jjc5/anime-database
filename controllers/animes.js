const Anime = require('../models/anime.js');
const router = require('express').Router();



//Create
  router.post('/', async(req, res) => {
    try{
      const createdAnime = await Anime.create(req.body)
      res.status(200).json(createdAnime)
    }catch(error){
      console.error(error)
      res.status(400).json({ message: error.message })
    }
  })

//Read
  //INDEX
    router.get('/', async (req, res) => {
      try{
        const foundAnimes = await Anime.find({})
        res.status(200).json(foundAnimes)
      }catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
      }
    })

//DELETE
  router.delete('/:id', async (req, res) => {
    try{
      const deletedAnime = await Anime.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedAnime);
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message})
    }
  })

  module.exports = router;
