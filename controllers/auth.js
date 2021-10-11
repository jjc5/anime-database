const User = require('../models/user.js'); /*user model*/
const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('dotenv').config();
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js');

/*
 * @route   POST api/auth
 * @desc    Authenticate user
 * @access  public
 */
router.post('/', (req, res) => {
 const {name, email, password} = req.body;

 //simple validation
 if(!email || !password){
   return (res.status(400).json({ message: 'Please enter all required fields' }));
 }

 //check for existing users
    User.findOne({ email })
      .then(user => {
        if(!user) return res.status(400).json({ message: 'User Does Not Exist'});

        //validate password
        bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(400).json({ message: 'Invalid Credentials'});

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
                  email: user.email,
                }
              });
            }
          )
        })
      })
  });

  /*
   * @route   get api/auth/user
   * @desc    get user data
   * @access  public
   */
   router.get('/user', auth, (req, res) => {
     User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user));
   });
 module.exports = router;
