import axios from 'axios';

class CourseService {

  http = axios.create({
    baseURL: `http://localhost:5000/api/courses`,
    headers: {
      "Content-type": "application/json"
    }
  })

  getAllCourses(){
    return this.http.get('/');
  }

  getSingleCourse(id) {
    return this.http.get(`/${id}`);
  }

  
}

export default new CourseService();