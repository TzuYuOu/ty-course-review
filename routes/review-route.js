const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');
const auth = require('../middleware/auth');


router.get('/user', auth, reviewController.getUserReview);
router.get('/:id', reviewController.getSingleReview);
router.post('/', reviewController.postReview);
router.put('/', reviewController.updateReview);


module.exports = router;