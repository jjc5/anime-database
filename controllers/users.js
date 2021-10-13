const User = require('../models/user.js'); /*user model*/
const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

/*
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */
 router.get('/', async (req, res) => {
   try{
     const foundUsers = await User.find({})
     res.status(200).json(foundUsers)
   }catch(error){
     console.error(error)
     res.status(400).json({message: error.message})
   }
  });

 //@route POST api/users/register
//@desc Register a new user
router.post('/register', (req, res) => {
 const {name, email, password} = req.body;

 //simple validation
 if(!name || !email || !password){
   return (res.status(400).json({ message: 'Please enter all required fields' }));
 }

 //check for existing users
    User.findOne({ email })
      .then(user => {
        if(user) return res.status(400).json({ message: 'User already exists'});

        const newUser = new User ({
          name,
          email,
          password
        });

        //Create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => {
                jwt.sign(
                    { id: user.id },/*payload*/
                    SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                      if(err) throw err;
                      res.json({
                        token,
                        user: {
                          id: user.id,
                          name: user.name,
                          email: user.email
                        }
                      });
                    }
                  )
              })
          })
        })
      })
  });

  //UPDATE
  router.put('/:id', async (req, res) => {
    try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).json(updatedUser)
    }catch(error){
      console.error(error);
      res.status(400).json({ message: error.message })
    }
  })

 module.exports = router;
