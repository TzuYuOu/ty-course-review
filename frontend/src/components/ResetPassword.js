import React, { useState } from 'react'
import authService from '../services/auth-service';
import { Link, useHistory } from 'react-router-dom';

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const history = useHistory();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
      setPassword("");
      setConfirmPassword("");
      return setError("Password isn't match");
    }

    authService.resetPassword(props.match.params.resetToken, { password })
      .then(res => {
        alert (`密碼更新成功!`);
        setSuccess('密碼更新成功');
        history.push('/login');
      })
      .catch(err => {
        console.log(err);
        setError("Token is invalid");
      })
    
  }
  return (
    <div className="container">
      
      <div className="row">
        <h3 className="text-center">忘記密碼</h3>
        <div className="col-md-4 offset-md-4 bg-light mt-4 p-4">
          <form onSubmit={forgotPasswordHandler} className="row g-3"> 
            <h5 className="text-center">重新設定密碼</h5>
            {error && <span className="text-danger">{error}</span>}
            {success && (
              <span className="text-success">
                {success} <Link className="btn btn-success float-end" to="/login">Login</Link>
              </span>
            )}
            <input 
              type="password"
              required
              id="password"
              placeholder="Enter new Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            
            />
            <input 
              type="password"
              required
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
            
            />
            <button type="submit" className="btn btn-dark float-end" disabled={success}>送出</button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
