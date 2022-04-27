const Fav = require('../models/fav');

exports.createFav = async(req, res) => {
    const { body } = req;

    try {
        const newFav = await Fav.findById(body._id);

        if (!newFav) {
            const fav = await Fav.create(body);
            res.status(201).json({fav});
        }
        else {
            const fav = await Fav.updateOne({_id: body._id}, body);
            res.status(200).json({fav});
        }
    }
    catch(e){
        res.status(401).json({ message: 'Error we can not create the fav' })
    }
};

exports.getFavs = async(req, res) => {
    try {
      const fav = await Fav.find().populate('user');
      res.status(200).json(fav)
    } 
    catch(e) {
      res.status(401).json({ message: 'Error we can not find favs' })
    }
};

exports.getFav = async(req, res) => {
    const { id } = req.params
    try {
      const fav = await Fav.findById(id);
      res.status(200).json(fav)
    } 
    catch(e) {
      res.status(401).json({ message: 'Error we can not find the fav' })
    }
};

exports.getFavByUser = async(req, res) => {
  const { id } = req.params
  try {
    const fav = await Fav.find({user: id}).populate('user');
    res.status(200).json(fav)
  } 
  catch(e) {
    res.status(401).json({ message: 'Error we can not find the fav' })
  }
};

exports.deleteFav = async(req, res) => {
    const { id } = req.params
    try {
      const fav = await Fav.findByIdAndDelete(id);
      res.status(200).json(fav)
    } 
    catch(e) {
      res.status(401).json({ message: 'Error we can not find the fav' })
    }
};