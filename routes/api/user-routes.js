const router = require("express").Router();

const { getAllUsers, addNewUser, updateUser, deleteUser } = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(addNewUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendsId')
    .post()
    .delete();

module.exports = router;