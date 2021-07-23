import { useState, useEffect } from 'react';
import reviewService from '../services/review-service';
import { Link } from 'react-router-dom';

const MyReview = () => {
  
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    reviewService.getUserReview()
      .then(res => {
        setReviews(res.data);
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div>
      {
        isLoading ? <div>Loading ...</div>
        : 
        (
          reviews.length > 0 ?
          (
            reviews.map((review, index) => {
              return(
                
                <li className="list-group-item" key={index}>
                  <strong>{review.course.courseId} {review.course.name}</strong>
                  <p>{review.review}</p>
                  
                  <Link to={{
                    pathname: "/courses/" + review.course + "/review",
                    state: {
                      currentReview: review
                    }
                  }} className="btn btn-primary col-4 mx-1 mb-1"> 修改心得 </Link>
                </li>
              )
            })
          ): <div>No review</div>
          
        )
      }
      
    </div>
  )
}

export default MyReview
