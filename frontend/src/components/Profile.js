import React, { useState, useEffect } from 'react';
import authService from '../services/auth-service';

const Profile = (props) => {

  const [userInfo, setUserInfo] = useState({ name: "", email: ""});
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

  const handleUserInfo = (e) => {
    const {name , value} = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }

  const updateProfile = () => {
    let profile = {
      name: userInfo.name,
      email: userInfo.email
    }

    console.log(profile)

    authService.updateProfile(profile)
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log("Update fail")
      })
  }

  return (
    <div className="row">
      {
        isLoading 
        ?  <div>Loading ...</div>
        : 
        <div className="bg-white col col-md-6 offset-md-3">
          <form className="row g-3">
            
            <h3 className="">Profile</h3>
            <div className="mt-2">
              <label className="form-label">Name</label>
              <input value={userInfo.name} onChange={handleUserInfo} type="text" name="name" className="form-control"/>
            </div>
            <div className="mt-2">
              <label className="form-label">Email</label>
              <input value={userInfo.email} onChange={handleUserInfo} type="text" name="email" disabled  className="form-control"/>
            </div>
            <div>
              <button onClick={updateProfile} disabled={userInfo.name === ""} className="form-control btn btn-primary mb-2">Save</button>
            </div>
          </form>
        </div>
        
      }
      
    </div>
  )
}

export default Profile
