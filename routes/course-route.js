const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course-controller');
// const auth = require('../middleware/auth');


router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getSingleCourse);
router.post('/', courseController.postCourse);

module.exports = router