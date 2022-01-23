import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from './store/Auth'
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useEffect } from 'react';

/* const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
} */

function App() {
  const isAuth = useSelector(state => state.authReducer.isAuthenticated);
  const expiryTime = useSelector(state => state.authReducer.expirationTime);
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage)
      dispatch(authActions.setAuthentication({ isAuthenticatedStatus: true, token: tokenFromStorage }));
   
 /*     const remainingTime = calculateRemainingTime(expiryTime);
console.log(remainingTime);
      setTimeout( () => {
        dispatch(authActions.logout());
      },remainingTime
      )  */ 
    }, [])

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isAuth &&
          <Route path='/auth'>
            <AuthPage />
          </Route>}
        {isAuth &&
          <Route path='/profile'>
            <UserProfile />
          </Route>}
        <Route path='*' >
          <Redirect to="/auth" />
        </Route>

      </Switch>
    </Layout>
  );
}

export default App;
