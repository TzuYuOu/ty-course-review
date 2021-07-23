const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth-controller');
const auth = require('../middleware/auth');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/profile', auth, authController.getProfile);
router.post('/forgotPassword', authController.forgotPassword);
router.put('/passwordReset/:resetToken', authController.resetPassword);

module.exports = router;