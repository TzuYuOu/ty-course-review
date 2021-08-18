import { Redirect, Route } from 'react-router-dom';
import authService from '../services/auth-service';

const UnAuthenticatedRoute = ({ component: C, appProps, restricted, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authService.isLogin() && restricted
          ? <Redirect to="/" />
          : <C {...props} {...appProps} />
        }
    />
  )
}

export default UnAuthenticatedRoute
