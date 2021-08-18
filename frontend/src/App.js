import React, { useEffect,  useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CoursesList from './components/CourseList';
import AddReview from './components/AddReview';
import Course from './components/course';
import Login from './components/login';
import Register from './components/register';
import Profile from './components/Profile';
import MyReview from './components/MyReview';
import Nav from './components/Nav';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import NotFound from './components/NotFound';
import CourseService from './services/course-service';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnAuthenticatedRoute from './components/UnAuthenticatedRoute';

const App = (props) => {

  const [ courses, setCourses] = useState([]); 

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

    retrieveCourses();

	}, []);
  

  return ( 
    <div>
      
      <Nav/>
      <div className="container mt-3">
        <Switch>
          <Route 
            exact path={["/"]} 
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
            restricted={true}
          />
          <UnAuthenticatedRoute
            path='/register'
            component={Register}
            restricted={true}
          />
          <UnAuthenticatedRoute
            path='/forgotPassword'
            component={ForgotPassword}
            restricted={true}
          />
          <UnAuthenticatedRoute
            path='/passwordReset/:resetToken'
            component={ResetPassword}
            restricted={true}
          />

          <AuthenticatedRoute 
            exact path='/courses/:id/review'
            component={AddReview} 
          />
          <AuthenticatedRoute 
            path='/profile'
            component={Profile}
          />
          <AuthenticatedRoute 
            path='/myreview'
            component={MyReview}
          />
          <Route component={NotFound} />

        </Switch>
      </div>
      
    </div>
  );
}

export default App;