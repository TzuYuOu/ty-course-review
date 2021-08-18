import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../services/auth-service";
import validator from 'validator';

const Register = () => {

  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }) 

  const handleChange = (e) => {
    const {name , value} = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const handleRegister = (e) =>{
    e.preventDefault();

    if(!validator.isEmail(userInfo.email)){
      return setError("Enter valid email")
    }

    if(userInfo.password !== userInfo.confirmPassword){
      setUserInfo({
        ...userInfo,
        password: "",
        confirmPassword: ""
      })

      return setError("Password does not match");
    }

    let userData = {
      name: userInfo.name,
      email: userInfo.email,
      password: userInfo.password
    }

    AuthService.register(userData)
      .then((res) => {
        alert (`Welcome ${userInfo.name}, you've registered successfully!`)
      })
      .catch(err => {
        console.log(err)
        return setError("This email has been used");
      })
      
    
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <div className="bg-white mt-4 p-4">
            <form onSubmit={handleRegister}  className="row g-3">
              <h4>歡迎加入我們</h4>
              { error && <span className="text-danger">{error}</span>}
              <div className="col-12">
                <input type="text" name="name" value={userInfo.name} onChange={handleChange} className="form-control" placeholder="Username"></input>
              </div >
              <div className="col-12">
                <input type="text" name="email" value={userInfo.email} onChange={handleChange} className="form-control" placeholder="eg: example@google.com"></input>
              </div >
              <div className="col-12">
                <input type="password" name="password" value={userInfo.password} onChange={handleChange} className="form-control" placeholder="Password"></input>
              </div>
              <div className="col-12">
                <input type="password" name="confirmPassword" value={userInfo.confirmPassword} onChange={handleChange} className="form-control" placeholder="Confirm Password"></input>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-dark float-end">註冊</button>
              </div>
            </form>
            <hr/>
            <div className="col-12">
              <p className="mb-0">已經有帳號了嗎? <Link to="/login">登入</Link></p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register