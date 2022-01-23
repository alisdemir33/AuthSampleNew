import { createSlice } from '@reduxjs/toolkit';


const initialState = { isAuthenticated: false ,authToken:''}

const authSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {       
        setAuthentication(state,action) {           
            state.isAuthenticated = action.payload.isAuthenticatedStatus;         
            state.authToken=action.payload.token;
            //state.expirationTime = action.payload.expirationTime;
            localStorage.setItem('token',action.payload.token)
        },
        logout(state) {
            state.isAuthenticated =false;
            state.authToken='';
            localStorage.removeItem('token')
        }      
    }
})

export const authActions =authSlice.actions; 
export default authSlice.reducer;