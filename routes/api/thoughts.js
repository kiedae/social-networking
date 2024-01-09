const router = require('express').Router();
const {
    getThoughts,
    getThoughtById,
    newThought,
    deleteThought,
    updateThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// Path to /api/thoughts
router.route('/').get(getThoughts).post(newThought);

// Path to api/thoughts/thoughtId
router.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought).delete(deleteThought);

// Path to api/thoughtid/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// Path to api/thoughtid/reactions/reactionid
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;