const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/userController');

// Routes for handling user data
router.route('/')
  .get(getUser)  // GET all users
  .post(createUser);  // POST a new user

// Routes for handling individual user data
router.route('/:userId')
  .get(getSingleUser)  // GET a single user by ID
  .put(updateUser)  // PUT (update) a user by ID
  .delete(deleteUser);  // DELETE a user by ID

// Routes for managing user's friends
router.route('/:userId/friends/:friendId')
  .post(addFriend)  // POST (add) a friend to user's friend list
  .delete(deleteFriend);  // DELETE a friend from user's friend list

module.exports = router;
