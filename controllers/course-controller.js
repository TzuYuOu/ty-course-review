const Course = require('../models/course');
const mongoose = require('mongoose')


const getAllCourses = async (req, res) => {
  try{
    const courses = await Course.find();
    res.json(courses)
  }
  catch(err){
    res.json({message: err})
  }
}

const getSingleCourse = async (req, res) => {
  try {
    
    const course = await Course.aggregate([
      {
        $match : {
          _id : new mongoose.Types.ObjectId(req.params.id)
        }
      },
      {
        $lookup : {
          from: "reviews",
          let: {
            id: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                    $eq: ["$course", "$$id"],
                },
              },
            }
          ],
          as: "reviews"
        }
      },
      {
        $addFields: {
          reviews: "$reviews"
        }
      }
    ])
    
    res.json(course[0]);
  } 
  catch(err){
    res.status(404).json({error: "Not found"})
  }
}

const postCourse = async(req, res) => {
  const courses = req.body.courses;
  try {
    const result = await Course.insertMany(courses);
    // console.log(result)
    res.json({ message: `Insert ${result.length} documents success`});
  }
  catch(err){
    res.status(500).json({error: err});
  }
}

module.exports = {
  getAllCourses,
  getSingleCourse,
  postCourse
}