import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/Auth';
import { useHistory } from 'react-router-dom';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history =useHistory();


  const emailRef = useRef();
  const passwordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;
    let url =''
    setIsLoading(true);
    if (isLogin) {     
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbOq0U_3F8xy_7BFeYjL4bNzbvUQHoki8'
    }
    else {    
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbOq0U_3F8xy_7BFeYjL4bNzbvUQHoki8'
    }

    fetch(url,{
      method: 'POST',
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type':'application-json'
      }
    }).then( (res) => {    
      if(res.ok){
          console.log(res)
          setIsLoading(false)
         
          return res.json();
      }else{
        return res.json().then ((data) =>{
        let errMessage='Authentication Failed!'
        if(data && data.error && data.error.message) {
          setIsLoading(false) 
          errMessage=data.error.message;           
        }
        throw new Error(errMessage);
       // alert(errMessage)
        //console.log(data);
        })
      }
    }).then ((data) => {
      console.log(data)
      const expiryTime = new Date((new Date().getTime() + (+data.expiresIn*1000 )))
      dispatch(authActions.setAuthentication({ isAuthenticatedStatus: true, token: data.idToken, expirationTime:expiryTime.toISOString() }));
      history.replace('/')
    })
    .catch((error) =>{
      alert(error.message);

    });
  }

    return (
      <section className={classes.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' required ref={passwordRef} />
          </div>
          <div className={classes.actions}>
           {!isLoading  && <button> {isLogin ? 'Login' : 'Create Account'}</button> }
           {isLoading && <p>Sending Request</p>}
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    );
  };

  export default AuthForm;
