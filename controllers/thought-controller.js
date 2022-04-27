const { User, Thought} = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .select('-_v')
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) =>{
        console.log(err);
        res.status(500).json(err);
      });
  },

getSingleThought(req, res){
  Thought.findOne({
    _id: req.params.thoughtId
  })
  .select('-_v')
  .populate('reactions')
  .then((dbThoughtData) => {
    if (!dbThoughtData) {
      return res.status(404).json({
        message: 'No thought with this id!'});
    }
    res.json(dbThoughtData);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},

createThought(req, res) {
  Thought.create(req.body)
   .then((dbThoughtData) => {
     res.json(dbThoughtData);
   })
   .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},

editThought(req, res) {
  Thought.findOneAndUpdate(
    {_id: req.params.thoughtId },
    {
      $set: req.body,
    },
    {
      runValidators: true,
      new: true,
    }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        return res.status(404).json({
          message: 'No thought with this id!'
        });
      }
      res.json(dbThoughtData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},

deleteThought(req, res) {
  Thought.findOneAndDelete({
    _id: req.params.thoughtId})
    .then((dbThoughtData)=>{
      if (!dbThoughtData) {
        return res.status(404).json({
          message: 'no thought with this id!'
        });
      }
      return User.deleteMany({
        _id: { $in: dbThoughtData.thoughts} });
    })
    .then(() => {
      res.json({ message: 'Thought and associated Users deleted!'});
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json(err);
    });
},

addReaction(req, res) {
 Thought.findOneAndUpdate(
   {_id: req.params.thoughtId},
   { $addToSet: 
    {reactions: req.params.reactionId}},
    {new: true})
    .then((dbThoughtData)=>{
      if(!dbThoughtData) {
        return res.status(404).json({
          message: 'No thought with this id!'});
      }
      res.json(dbThoughtData);
    })
    .catch((err)=>{
      console.log(err);
      res.status(500).json(err);
    });
},

removeReaction(req, res){
  Thought.findOneAndUpdate(
    {_id: req.params.thoughtId},
    { $pull: 
      {reactions: req.params.reactionI}},
      {new: true})
      .then((dbThoughtData)=>{
        if(!dbThoughtData){
          return res.status(404).json({
            message: 'No thought with this id!'});
        }
        res.json(dbThoughtData);
      })
      .catch((err)=>{
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;