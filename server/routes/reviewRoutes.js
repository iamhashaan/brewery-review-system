const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/add-review', reviewController.addReview);
router.get('/get-reviews',reviewController.getReview)


module.exports = router;
