
import { configureStore } from '@reduxjs/toolkit';
import authReducer  from './Auth';

const store = configureStore(
    {
        reducer: {
          authReducer:  authReducer          
        }
    });   


export default store;

