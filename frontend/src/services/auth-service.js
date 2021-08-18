import axios from 'axios';

class AuthService {
  http = axios.create({
    baseURL: `/api/auth`,
    headers: {
      "Content-type": "application/json"
    }
  })

  register(data){
    return this.http.post('/register', data);
  }

  login(data){
    return this.http.post('/login', data);
  }
 
  getProfile(){
    return this.http.get('/profile', { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}});
  }

  forgotPassword(data){
    return this.http.post('/forgotPassword', data);
  }

  resetPassword(token, data){
    return this.http.put(`/passwordReset/${token}`, data);

  }

  isLogin(){
    if(localStorage.getItem("token")){
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("token");
  }
  
}

export default new AuthService();