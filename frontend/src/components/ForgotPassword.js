import React, { useState } from 'react'
import authService from '../services/auth-service';

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try{
      const { data } = await authService.forgotPassword({email})
      console.log(data)  
      setSuccess("請到信箱檢查連結並修改密碼");
    }
    catch(err){
      console.log(err);
      setEmail("");
      setError("信箱錯誤");
    }
  }


  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center">忘記密碼</h3>
        <div className="col-md-4 offset-md-4 bg-white mt-4 p-4">
          <form onSubmit={forgotPasswordHandler} className="row g-3"> 
            <h5 className="text-center">重新設定密碼</h5>
            {success && <span className="text-success">{success}</span>}
            {error && <span className="text-danger">{error}</span>}
            <input 
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            
            />
            <button type="submit" className="btn btn-dark float-end" disabled={success}>送出</button>
          </form>
          
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
