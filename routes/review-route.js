const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');
const auth = require('../middleware/auth');

router.get('/user', auth, reviewController.getUserReview);
router.get('/:id', reviewController.getSingleReview);
router.post('/', auth, reviewController.postReview);
router.put('/', auth, reviewController.updateReview);


module.exports = router;