const mongoose = require('mongoose');
const Review = require('../models/review');
const Schema = mongoose.Schema;

const getSingleReview = async (req, res) => {
  try{
    const review = await Review.findById(req.params.id);
    res.json(review)
  }
  catch(err){
    res.json({message: err});
  }
}

const postReview = async (req, res) => {

  const review = new Review({
    user:  mongoose.Types.ObjectId(req.user.id),
    course: mongoose.Types.ObjectId(req.body.courseId),
    review: req.body.review
  });
  try{
    const savedReview = await review.save();
    res.json({success: "true"});
  }
  catch(err){
    res.status(500).json({error: err});
  }
}

const updateReview = async (req, res) => {

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.body.reviewId,
      {review: req.body.review},
      {new: true}
    );

    res.json({message: "Update success!"});
  }
  catch(err){
    res.status(400).json({error: err});
  }
}

const getUserReview = async (req, res) => {
  try{
    const userReviews = await Review.find({
      user: mongoose.Types.ObjectId(req.user.id)
    }).populate('course', ['name', 'courseId']).exec()
    res.json(userReviews);
  }
  catch(err){
    res.status(404).json({error: "Reviews not found"});
  }
}


module.exports = {
  getSingleReview,
  postReview,
  updateReview,
  getUserReview
}