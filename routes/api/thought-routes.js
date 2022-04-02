const router = require("express").Router();

const { getAllThoughts, getSingleThoughtById, createThought, updateThoughtById, deleteThoughtByItsId, createReaction, deleteReaction } = require("../../controllers/thought-controller");

router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getSingleThoughtById)
    .put(updateThoughtById)
    .delete(deleteThoughtByItsId)

router
    .route('/:thoughtId/reactions')
    .post(createReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;