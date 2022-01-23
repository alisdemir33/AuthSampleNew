import classes from './ProfileForm.module.css';
import { useRef,useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef();
  const idTokenValue = useSelector(state => state.authReducer.authToken);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    let passwordValue = passwordRef.current.value;

    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCbOq0U_3F8xy_7BFeYjL4bNzbvUQHoki8'

    setIsLoading(true);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        idToken: idTokenValue,
        password: passwordValue,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        console.log(res)
        setIsLoading(false)
        return res.json();
      } else {
        return res.json().then((data) => {
          let errMessage = 'Password Reset Failed!'
          if (data && data.error && data.error.message) {
            setIsLoading(false)
            errMessage = data.error.message;
          }
          throw new Error(errMessage);
        })
      }
    }).then((data) => {
      console.log(data)
      history.replace('/')
     // dispatch(authActions.setAuthentication({ isAuthenticatedStatus: true, token: data.idToken }));
    })
      .catch((error) => {
        alert(error.message);

      });

  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
