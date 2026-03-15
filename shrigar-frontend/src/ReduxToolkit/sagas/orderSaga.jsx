import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure
} from "../orderSlice";

function* createOrderSaga(action) {
  try {

    const response = yield call(
      axios.post,
      "https://api.shrigaar.com/api/v1/shrigar/order/create/api57",
      action.payload
    );

    // ✅ Order success in redux
    yield put(createOrderSuccess(response.data));

    // ✅ Clear cart (if stored in localStorage)
    localStorage.removeItem("cart");

    // ✅ Redirect to orders page
    window.location.href = "/";

  } catch (error) {

    yield put(
      createOrderFailure(
        error.response?.data?.message || error.message
      )
    );

  }
}

export function* watchOrderSaga() {
  yield takeLatest(createOrderRequest.type, createOrderSaga);
}