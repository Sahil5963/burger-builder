import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START,
    }
    
}



export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId,
    }
}

export const logout = () => {
    return {
       type:actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout = (expirationtime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationtime * 1000)  
   } 
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error:error,
    }
}

export const auth = (email, password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const autData = {
            email: email,
            password: password,
            returnSecureToken:true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBHNQGBK2J6cEK9qH9u1llFSwRg2reknpA';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBHNQGBK2J6cEK9qH9u1llFSwRg2reknpA';

        }
        axios.post(url, autData)
            .then(res => {
                console.log(res);
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(error => { 
                dispatch(authFail(error.response.data.error));
            })
    }
}