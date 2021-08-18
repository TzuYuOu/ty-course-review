import axios from 'axios';

class ReviewService {
  http = axios.create({
    baseURL: `http://localhost:5000/api/reviews`,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })

  createReivew(data){
    return this.http.post("/", data);
  }

  getUserReview(){
    return this.http.get("/user");
  }

  updateReview(data){
    return this.http.put("/", data);
  }

  
}

export default new ReviewService();