import React, { useEffect,  useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CoursesList from './components/course-list';
import AddReview from './components/add-review';
import Course from './components/course';
import Login from './components/login';
import Register from './components/register';
import Search from './components/search';
import Profile from './components/Profile';
import MyReview from './components/MyReview';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import NotFound from './components/NotFound';
import CourseService from './services/course-service';
import AuthService from './services/auth-service';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnAuthenticatedRoute from './components/UnAuthenticatedRoute';


const App = (props) => {

  const [ user, setUser] = useState(undefined);
  const [ courses, setCourses] = useState([]);
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  
  // get all courses from db
  const retrieveCourses = () =>{
    CourseService.getAllCourses()
      .then(res => {
        // console.log(res.data);
        setCourses(res.data)
        
      })
      .catch(err =>{
        console.log(err);
      })
  }

  useEffect( () => {

    const user = AuthService.getCurrentUser();
    if(user && user.token){
      setUser(user);
      setIsAuthenticated(true);
    }

    retrieveCourses();

	}, []);
  

  return ( 
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
				<div className="container-fluid">
          <Link to="/courses" className="navbar-brand">課程心得</Link>
          <div className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/courses" className="nav-link">所有課程</Link>	
            </li>
            <li className="nav-item">
              { isAuthenticated && <Link to="/myreview" className="nav-link">我的心得</Link> }
            </li>
            <li className="nav-item">
              { isAuthenticated && <Link to="/profile" className="nav-link">我的帳戶</Link> }
            </li>
            <li className="nav-item">
              {
                user ? 
                  <a href="/" onClick={AuthService.logout} className="nav-link">{user.name} 登出</a>
                :
                  <Link to="/login" className="nav-link">登入</Link>
              }
              
            </li>
            <li className="nav-item">
              {
                !isAuthenticated && 
                  <Link to="/register" className="nav-link">註冊</Link>
              }
            </li>

            
            
            
          </div>
        </div>
        
			</nav>
      
      <Search courses={courses}/>

      <div className="container mt-3">
        <Switch>
          <Route 
            exact path={["/", "/courses"]} 
            render={(props) => {
              return (
                <CoursesList {...props} courses={courses}/>
              )
            }}
          />
          <Route 
            exact path="/courses/:id"
            render={(props) => {
              return (
                <Course {...props}/>
              )
            }}/>
          <UnAuthenticatedRoute 
            path='/login' 
            component={Login}
            appProps={{isAuthenticated}}
          />
          <UnAuthenticatedRoute
            path='/register'
            component={Register}
            appProps={{isAuthenticated}}
          />
          <UnAuthenticatedRoute
            path='/forgotPassword'
            component={ForgotPassword}
            appProps={{isAuthenticated}}
          />
          <UnAuthenticatedRoute
            path='/passwordReset/:resetToken'
            component={ResetPassword}
            appProps={{isAuthenticated}}
          />

          <AuthenticatedRoute 
            exact path='/courses/:id/review'
            component={AddReview}
            appProps={{isAuthenticated}}
          />
          <AuthenticatedRoute 
            path='/profile'
            component={Profile}
            appProps={{isAuthenticated}}
          />
          <AuthenticatedRoute 
            path='/myreview'
            component={MyReview}
            appProps={{isAuthenticated}}
          />
          <Route component={NotFound} />

        </Switch>
      </div>
        
    </div>
  );
}

export default App;