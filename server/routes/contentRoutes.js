const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middleware/authMiddleware');

// Public read access
router.get('/:model', contentController.getAll);
router.get('/:model/:id', contentController.getOne);

// Protected write access
router.post('/:model', authMiddleware, contentController.create);
router.put('/:model/:id', authMiddleware, contentController.update);
router.delete('/:model/:id', authMiddleware, contentController.delete);

module.exports = router;
