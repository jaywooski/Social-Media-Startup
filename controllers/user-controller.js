const User  = require('../models/User');
const Thought = require('../models/Thought')

const userController = {
    
    // get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path:'thoughts', 
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });

    },


    // get a single user by its _id and get its populated thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch( err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Post a new user
    createUser(req, res) {
        User.create(req.body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // Put to update a user by its _id
    updateUser({ params, body }, res){
        User.findOneAndUpdate({ id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No User with this ID found! :(' })
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Delete to remove a user by its _id
    deleteUser({ params, body }, res){
        User.findOneAndDelete({ id: params.id}, body, { new: true })
        .then(dbUserData => {
            // Remove a user's thoughts when deleted
            
            if(!dbUserData){
                return res.status(404).json({ message: 'No user with this ID' });
            }
            res.json(dbUserData)
        })
        .then((dbUserData) => {
            Thought.deleteMany({username: dbUserData.username})
        })
        .catch((err) => res.json(err))
    },



    // Add a new friend to user's friend list
    addFriend({ params, body }, res ){
        console.log(params);
        User.findOneAndUpdate(
            { _id: params.id},
            { $push: { friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // DELETE to remove friend from user's friend list
    deleteFriend({ params }, res ){
        console.log(params);
            User.findOneAndUpdate(
                { _id: params.id},
                { $pull: { friends: params.friendId } },
                { new: true }
            )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No User with this ID'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    }
    
};

module.exports = userController;