const Review = require('../models/reviewModel');

exports.addReview = async (req, res) => {
  try {
    const { breweryId, rating, review } = req.body;
    console.log(breweryId,rating,review)
    
    const userId = '6546b98271907159955c8508';

    const newReview = new Review({
      user: userId,
      breweryId,
      rating,
      review,
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'An error occurred while adding the review.' });
  }
};
exports.getReview = async (req, res) => {
  try {
    const { breweryId } = req.query;
    const reviews = await Review.find({ breweryId }).populate('user');

    if (!reviews) {
      return res.status(404).json({ message: 'No reviews found for this brewery.' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

}



