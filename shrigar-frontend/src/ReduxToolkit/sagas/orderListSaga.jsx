import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure
} from "../orderSlice";

function* fetchOrdersSaga(action) {
  try {

    const response = yield call(
      axios.get,
      "https://www.shrigaar.com/api/v1/shrigar/order/list/api58"
    );

    const allOrders = response.data.orders;

    const userOrders = allOrders.filter(
      (order) => order.userId === action.payload
    );

    yield put(fetchOrdersSuccess(userOrders));

  } catch (error) {

    yield put(fetchOrdersFailure(error.message));

  }
}

export function* watchOrderListSaga() {
  yield takeLatest(fetchOrdersRequest.type, fetchOrdersSaga);
}