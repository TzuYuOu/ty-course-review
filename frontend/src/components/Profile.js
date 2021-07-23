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
        : <div>{userInfo.name}</div>
      }
      
    </div>
  )
}

export default Profile
