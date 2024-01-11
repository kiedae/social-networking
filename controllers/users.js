const { User, Thought } = require("../models");

// Function to handle errors and respond with a 500 status
const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json(err);
};

// UserController object containing methods for user-related operations
const UserController = {
  // Retrieves all users from the database
  async getUser(req, res) {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      handleErrors(res, err);
    }
  },

  // Retrieves a single user by their unique ID, populating thoughts and friends
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");

      if (!user) {
        return res.status(404).json({ message: "No User found with that ID!" });
      }

      res.json(user);
    } catch (err) {
      handleErrors(res, err);
    }
  },

  // Creates a new user with the provided data
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // Updates an existing user's information based on their unique ID
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No User found with this ID!" });
      }

      res.json(user);
    } catch (err) {
      handleErrors(res, err);
    }
  },

  // Deletes a user by their unique ID and also deletes all associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "Couldnt't Find That User" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and User's Thoughts deleted!" });
    } catch (err) {
      handleErrors(res, err);
    }
  },

  // Adds a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Couldnt't Find That User" });
      }

      res.json(user);
    } catch (err) {
      handleErrors(res, err);
    }
  },

  // Deletes a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "Couldnt't Find That User" });
      }

      res.json(user);
    } catch (err) {
      handleErrors(res, err);
    }
  },
};

// Export UserController
module.exports = UserController;
