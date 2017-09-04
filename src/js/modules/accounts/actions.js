import axios from "axios";
import appHistory from "../../tools/appHistory";

import * as t from "./actionTypes";
import { CREATE_USER_FULFILLED } from "../users/actionTypes";
import { STUY_SPEC_API_URL, STUY_SPEC_API_HEADERS } from "../../constants";

export const signUp = registrationParams => {
  return dispatch => {
    dispatch({
      type: t.SIGN_UP_PENDING,
      payload: registrationParams,
    });

    const deviseParams = (({ email, password, passwordConfirmation }) => ({
      email,
      password,
      passwordConfirmation,
    }))(registrationParams);
    const additionalParams = (({ firstName, lastName }) => ({
      firstName,
      lastName,
    }))(registrationParams);

    axios
      .post(`${STUY_SPEC_API_URL}/auth`, deviseParams, STUY_SPEC_API_HEADERS)
      .then(response => {
        dispatch({
          type: t.SIGN_UP_FULFILLED,
          payload: response,
        });
        const userId = response.data.data.id;
        /* As Devise only accepts email/passwords, we need a separate update
         * for other user properties. Note that we are not simply dispatching
         * an UPDATE_USER because that will change the form name in the status
         * of the accounts state slice to editUser, which will prevent success
         * text from rendering on the signUpForm.
         */
        axios.put(
          `${STUY_SPEC_API_URL}/users/${userId}`,
          additionalParams,
          STUY_SPEC_API_HEADERS,
        );
      })
      .then(repsonse => {
        dispatch({
          type: CREATE_USER_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_UP_REJECTED,
          payload: err,
        });
      });
  };
};

export const signIn = (signInParams, isInModal) => {
  return dispatch => {
    dispatch({
      type: t.SIGN_IN_PENDING,
      payload: signInParams,
    });
    axios
      .post(
        `${STUY_SPEC_API_URL}/auth/sign_in`,
        signInParams,
        STUY_SPEC_API_HEADERS,
      )
      .then(response => {
        dispatch({
          type: t.SIGN_IN_FULFILLED,
          payload: response,
        });
        if (isInModal !== true) {
          // Explicit equality necessary because isInModal may also be null, which is falsey.
          appHistory.push("/myaccount/profile");
        }
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_IN_REJECTED,
          payload: err,
        });
      });
  };
};

export const signOut = session => {
  const headers = {
    "access-token": session.headers["access-token"],
    client: session.headers.client,
    uid: session.headers.uid,
  };
  return dispatch => {
    dispatch({ type: t.SIGN_OUT_PENDING, payload: headers });
    axios
      .delete(`${STUY_SPEC_API_URL}/auth/sign_out`, { headers })
      .then(response => {
        dispatch({
          type: t.SIGN_OUT_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.SIGN_OUT_REJECTED,
          payload: err,
        });
      });
  };
};

export const updateUser = (userParams, id) => {
  return dispatch => {
    dispatch({
      type: t.UPDATE_USER_PENDING,
      payload: userParams,
    });
    axios
      .put(
        `${STUY_SPEC_API_URL}/users/${id}`,
        userParams,
        STUY_SPEC_API_HEADERS,
      )
      .then(response => {
        dispatch({
          type: t.UPDATE_USER_FULFILLED,
          payload: response,
        });
      })
      .catch(err => {
        dispatch({
          type: t.UPDATE_USER_REJECTED,
          payload: err,
        });
      });
  };
};

export const openSignInModal = () => ({
  type: t.OPEN_SIGN_IN_MODAL,
});

export const closeSignInModal = () => ({
  type: t.CLOSE_SIGN_IN_MODAL,
});
