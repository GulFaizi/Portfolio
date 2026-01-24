const express = require('express');
const router = express.Router();
const { login, logout, checkAuth } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', authMiddleware, checkAuth);

module.exports = router;
