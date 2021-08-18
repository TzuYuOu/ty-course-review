import React, {  useState } from 'react'
import AuthService from "../services/auth-service";
import { Link } from 'react-router-dom';

const Login = (props) => {

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const {name , value} = e.target
    setLoginInfo({
      ...loginInfo,
      [name]: value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    let userData = {
      email: loginInfo.email,
      password: loginInfo.password
    }

    AuthService.login(userData)
      .then(res => {
        alert('Login successfully')
        localStorage.setItem('token', res.data.token);
        props.history.push('/')
        window.location.reload()
      })
      .catch(err => {
        alert('Login fail')
        console.log(err)
      })

  }

  return (
    
    <div className="row">
      <div className="col col-md-6 offset-md-3">
        <div className="bg-white mt-4 p-4">
          <form action="" className="row g-3">
            <h4>歡迎回來</h4>
            <div className="col-12">
              <input type="text" name="email" value={loginInfo.email} onChange={handleChange} className="form-control" placeholder="輸入信箱"></input>
            </div >
            <div className="col-12">
              
              <input type="password" name="password" value={loginInfo.password} onChange={handleChange} className="form-control" placeholder="輸入密碼"></input>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-dark float-end" onClick={handleLogin}>登入</button>
            </div>
            
          </form>
          <hr/>
          <div className="col-12">
            <p className="mb-1 text-center">還沒有帳戶嗎?<Link to="/register">註冊</Link></p>
          </div>
          <div className="col-12 text-center">
            <Link to="/forgotPassword">忘記密碼</Link>
          </div>
        </div>   
      </div>
    </div>   
    
  )
}

export default Login;