const { Thought } = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });    
    },

    // get thought by single ID
    getSingleThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No thought with this ID'})
            }
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // Create new thought and post thought to User's thoughts
    // array field
    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                { _id: body.userId },
                { $push: {thoughts:_id}},
                { new: true }
            );
        })
        .then(dbUserData => {
            if( !dbUserData) {
                return res.status(404).json({message: 'No user with that Id found'})
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // Update thought by its ID
    updateThoughtById({params, body}, res) {
        
        Thought.findOneAndUpdate({_id: params.id}, body, {
            new: true
        })
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No thought with this ID'})
            }
            res.json(dbThoughtData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },


    // Delete thought by its ID
    deleteThoughtByItsId({ params }, res ) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                return res.status(404).json({message: 'No thought with this ID found'})
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: {thoughts: params.thoughtId}},
                { new: true }
            );
        })
        .then((dbUserData) => {
            if(!dbUserData) {
                return res.status(404).json({message:'No user with this ID'});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    // Create reaction 
    createReaction({params, body}, res) {
        console.log(body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: {reactions: body }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user with that ID '})
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Delete reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id : params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId}}},
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    }
};

module.exports = thoughtController;