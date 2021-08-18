import { Redirect, Route } from 'react-router-dom';
import authService from '../services/auth-service';

const AuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={props =>
        authService.isLogin()  
          ? <C {...props} {...appProps} />
          : <Redirect to="/login" />
      }
    
    />
  )
}

export default AuthenticatedRoute
