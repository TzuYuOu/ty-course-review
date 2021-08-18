import React from 'react';
import authService from '../services/auth-service';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">課程心得</Link>
        <div className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">所有課程</Link>	
          </li>
          <li className="nav-item">
            { authService.isLogin() && <Link to="/myreview" className="nav-link">我的心得</Link> }
          </li>
          <li className="nav-item">
            { authService.isLogin() && <Link to="/profile" className="nav-link">我的帳戶</Link> }
          </li>
          <li className="nav-item">
          {
            authService.isLogin() ? 
              <a href="/" onClick={authService.logout} className="nav-link">登出</a>
            :
              <Link to="/login" className="nav-link">登入</Link>
          }
            
          </li>
          <li className="nav-item">
          {
            !authService.isLogin() && 
              <Link to="/register" className="nav-link">註冊</Link>
          }
          </li>
  
        </div>
      </div>
      
    </nav>
  )
}

export default Nav
