import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure
} from "../authSlice";

/* LOGIN */

function* loginSaga(action) {
  try {

    const response = yield call(
      axios.post,
      "https://www.shrigaar.com/api/v1/shringar/User/login/api66",
      action.payload
    );

    if (response.data.success) {

      const user = response.data.user;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      yield put(loginSuccess(user));

    }

  } catch (error) {
    yield put(loginFailure("Invalid email or password"));
  }
}

/* REGISTER */

function* registerSaga(action) {

  try {

    yield call(
      axios.post,
      "https://api.shrigaar.com/api/v1/shringar/User/registerUser/api61",
      action.payload
    );

    yield put(registerSuccess());

    alert("User Registered Successfully");

  } catch (error) {

    yield put(registerFailure("Registration failed"));

  }

}

export function* watchAuthSaga() {

  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);

}