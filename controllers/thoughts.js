const { Thought, User, Reaction } = require('../models');
const { Types } = require('mongoose');

// Define the ThoughtController object
const ThoughtController = {
  // Handler for fetching all thoughts from the database
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      // Respond with the list of thoughts
      res.json(thoughts);
    } catch (err) {
      // Handle internal server error during thought retrieval
      res.status(500).json({ error: 'Failed to fetch thoughts' });
    }
  },

  // Handler for retrieving a single thought by its unique ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        // Respond with an error if the thought is not found
        res.status(404).json({ error: 'Couldnt Find That Thought' });
      } else {
        // Respond with the retrieved thought
        res.json(thought);
      }
    } catch (err) {
      // Handle internal server error during thought retrieval
      res.status(500).json({ error: 'Failed to fetch thought' });
    }
  },

  // Handler for creating a new thought
  async newThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // Respond with the created thought
      res.status(201).json(thought);
    } catch (err) {
      // Handle internal server error during thought creation
      res.status(500).json({ error: 'Failed to create thought' });
    }
  },

  // Handler for deleting a thought by its unique ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
      // Respond with the deleted thought
      res.status(200).json(thought);
    } catch (err) {
      // Handle internal server error during thought deletion
      res.status(500).json({ error: 'Failed to delete thought' });
    }
  },

  // Handler for updating a thought by its unique ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });
      if (!thought) {
        // Respond with an error if the thought is not found
        res.status(404).json({ error: 'Thought not found' });
      } else {
        // Respond with the updated thought
        res.json(thought);
      }
    } catch (err) {
      // Handle internal server error during thought update
      res.status(500).json({ error: 'Failed to update thought' });
    }
  },

  // Handler for adding a reaction to a specific thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      thought ? res.json(thought) : res.status(404).json({ error: 'Thought not found' });
    } catch (e) {
      // Handle internal server error during reaction creation
      res.status(500).json({ error: 'Failed to create reaction' });
    }
  },

  // Handler for removing a specific reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      thought ? res.json(thought) : res.status(404).json({ error: 'Thought not found' });
    } catch (e) {
      // Handle internal server error during reaction deletion
      res.status(500).json({ error: 'Failed to delete reaction' });
    }
  },
};

// Export ThoughtController
module.exports = ThoughtController;
