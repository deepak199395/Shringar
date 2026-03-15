import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { productRequest, productSuccess, productFailure } from "../productSlice";
import { BASE_URL, PRODUCT_ENDPOINTS } from "../../config/endpoints";

function* fetchProducts(action) {

  try {

    const response = yield call(
      axios.get,
      `${BASE_URL}${PRODUCT_ENDPOINTS.LIST}`
    );

    const data = response.data;

    if (data?.success && data?.flage === "Y") {

      const filteredProducts = data.product.filter(
        (item) => item.collectionId === action.payload
      );

      yield put(productSuccess(filteredProducts));

    } else {

      yield put(productFailure("Failed to load products"));

    }

  } catch (error) {

    yield put(productFailure(error.message));

  }

}

export function* watchProductSaga() {

  yield takeLatest(productRequest.type, fetchProducts);

}