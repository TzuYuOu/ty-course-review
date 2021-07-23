import axios from 'axios';

class ReviewService {
  http = axios.create({
    baseURL: `http://localhost:5000/reviews`,
    headers: {
      "Content-type": "application/json"
    }
  })

  createReivew(data){
    return this.http.post("/",data);
  }

  getUserReview(){
    const user = JSON.parse(localStorage.getItem("user"));
    return this.http.get("/user", {headers: {'x-auth-token': user.token}});
  }

  updateReview(data){
    return this.http.put("/",data);
  }

  
}

export default new ReviewService();