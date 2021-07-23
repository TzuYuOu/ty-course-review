import React, { useState, useEffect } from 'react';
import authService from '../services/auth-service';

const Profile = (props) => {

  const [userInfo, setUserInfo] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authService.getProfile()
      .then(res => {
        setUserInfo(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <div className="container">
      {
        isLoading 
        ?  <div>Loading ...</div>
        : <div className="card">
            <div className="card-body">
              <h5 className="card-title">{userInfo.name}</h5>
              <span className="card-text">{userInfo.email}</span>
            </div>
            
          </div>
      }
      
    </div>
  )
}

export default Profile
