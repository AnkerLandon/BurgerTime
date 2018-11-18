import axios from 'axios';
import * as actionTypes from './actionTypes';

import APIKEY from '../../../src/ENV';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    let APIURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${APIKEY}`;
    const AuthData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    if (!isSignUp) {
      APIURL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${APIKEY}`;
    }
    axios
      .post(APIURL, AuthData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};
