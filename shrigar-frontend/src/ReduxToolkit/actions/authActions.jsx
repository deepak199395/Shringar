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
      "https://api.shrigaar.com/api/v1/shringar/User/login/api66",
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
    const response = yield call(
      axios.post,
      "https://api.shrigaar.com/api/v1/shringar/User/registerUser/api61",
      action.payload
    );

    if (response.data.success) {
      yield put(registerSuccess()); // ✅ triggers navigation
    }

  } catch (error) {
    yield put(
      registerFailure(
        error.response?.data?.message || "Registration failed"
      )
    );
  }
}

/* WATCHER */
export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(registerRequest.type, registerSaga);
}