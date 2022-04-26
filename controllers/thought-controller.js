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

// localhost/api/thought/:userId
router.route("/:thoughtId").get(getSingleThought).put(editThought).delete(deleteThought)

router.route("/:thoughtId/reactions").post(addReaction)

// localhost/api/users/:userId/friends/:friendId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction)

module.exports = router