import { useState } from 'react';
import { Link } from 'react-router-dom';
import reviewService from '../services/review-service';
import authSevice from '../services/auth-service';


const AddReview = (props) => {

	let initialReviewState = "";
	let editing = false;
	const user = authSevice.getCurrentUser();
	
	if (props.location.state && props.location.state.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.review
	}
	
	const [ submitted, setSubmitted] = useState(false);
	const [ review, setReview] = useState(initialReviewState);

	const handleInputChange = (event) =>{
		setReview(event.target.value);
	}

	const saveReview = () =>{
		let data  = {
			courseId: props.match.params.id,
			userId: user.userId,
			review: review,
		};

		if(editing){
			data.reviewId = props.location.state.currentReview._id;
			reviewService.updateReview(data)
				.then(res => {
					setSubmitted(true);
				})
				.catch(err => {
					console.log(err);
				})
		}
		else{
			reviewService.createReivew(data)
				.then(res => {
					setSubmitted(true);
				})
				.catch(err => {
					console.log(err);
				})
		}

		

	}

	
	return ( 
		<div>	
			<div className="submit-form">
				{ submitted ? 
					<div>
						<h4>You submitted successfully</h4>
						<Link to={`/courses/${props.match.params.id}`} className="btn btn-success">Back to Courses</Link>
					</div>
					: 
					<div>
						<div className="form-group">
							<label htmlFor="description">{ editing ? "修改" : "新增" }心得</label>
							<textarea 
								name="text" 
								id="text" 
								cols="30" 
								rows="10" 
								required 
								className="form-control" 
								value={review}
								placeholder="上課形式、課堂要求、學習內容"
								onChange={handleInputChange} />
							
						</div>
						<button onClick={saveReview} className="btn btn-success">
							Submit
						</button>
					</div>
				}
			</div>
		</div>
	);
}

export default AddReview;