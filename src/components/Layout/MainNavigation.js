import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/Auth';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {

  const isAuth = useSelector(state => state.authReducer.isAuthenticated);
  const dispatch =useDispatch();

  const logout = () =>{
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>{!isAuth &&
          <li>
            <Link to='/auth'>Login</Link>
          </li>
        }  {isAuth &&
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          }
          {isAuth && <li>
            <button onClick={logout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
