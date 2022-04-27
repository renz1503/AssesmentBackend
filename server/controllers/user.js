const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

exports.createUser = async(req, res) => {
    const { body } = req;

    try {
        const registered = await User.findOne({ email: body.email });
        if (!registered) {
          const password = body.password

          if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)){
            res.status(401).json({ message: 'Password must have minimum eight characters, at least one letter and one number' })
          }
          else{
            const user = await User.create(body);
            res.status(201).json({user});
          }
      }
        else {
            res.status(401).json({ message: 'Email already exists' });
        }
    }
    catch(e){
        res.status(401).json({ message: 'Error we can not create the user' })
    }
};

exports.getUsers = async(req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user)
    } 
    catch(e) {
      res.status(401).json({ message: 'Error we can not find users' })
    }
};

exports.getUser = async(req, res) => {
    const { id } = req.params
    try {
      const user = await User.findById(id);
      res.status(200).json(user)
    } 
    catch(e) {
      res.status(401).json({ message: 'Error we can not find the user' })
    }
};

exports.login = async(req, res) => {
  const { body: { email, password } } = req;
  
  try {
    const user = await User.findOne({ email: email }).select('password');
    
    if(!user || !password || !email) {
      throw new Error('User or password is wrong')
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    
    if(!isValid){
      throw new Error('User or password is wrong');
    }
    
    const token = jwt.sign({ id: user._id },
                             process.env.SECRET,
                           { expiresIn: 60 * 60 * 24 * 365 })
    res.status(201).json({ token });
  }
  catch(e){
      res.status(401).json({ message: 'Error your password or email is incorrect' });
    }
};