const router = require("express").Router()

const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    addReaction,
    removeReaction,
    editThought,
  } = require('../../controllers/thought-controller');

  // localhost/api/thoughts/
  router.route("/").get(getThoughts).post(createThought)

  //localhost/api/thoughts/:thoughtId
  router.route("/:thoughtId").get(getSingleThought).put(editThought).delete(deleteThought)

  // localhost/api/thoughts/:thoughtId/friend/
  router.route("/:thoughtId/reactions/:reactionId").post(addReaction).delete(removeReaction)

  module.exports = router