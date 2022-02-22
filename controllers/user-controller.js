const { User } = require("../models");

const userController = {
    
    // get all users
    findAllUsers(req, res) {
        User.find()
    } 


    // get a single user by its _id and get its populated thought and friend data

    // Post a new user

    // Put to update a user by its _id

    // Delete to remove a user by its _id

    // Remove a user's thoughts when deleted



    // Post to a dd anew friend to user's friend list

    // DELETE to remove friend from user's friend list
    
    
};

module.exports = userController;