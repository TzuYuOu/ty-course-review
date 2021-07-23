import { Redirect, Route } from 'react-router-dom';

const UnAuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !appProps.isAuthenticated
          ? <C {...props} {...appProps} />
          : <Redirect to="/" />}
    />
  )
}

export default UnAuthenticatedRoute
