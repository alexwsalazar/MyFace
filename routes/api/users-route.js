const router = require("express").Router()

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
    editUser,
  } = require('../../controllers/user-controller');

  // localhost/api/users/
router.route("/").get(getUsers).post(createUser)

// localhost/api/users/:userId
router.route("/:userId").get(getSingleUser).put(editUser).delete(deleteUser)

// localhost/api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend)

module.exports = router
