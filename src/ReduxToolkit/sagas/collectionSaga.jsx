import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  collectionRequest,
  collectionSuccess,
  collectionFailure
} from "../collectionSlice";

import { BASE_URL, COLLECTION_ENDPOINTS } from "../../config/endpoints";

function* fetchCollections() {

  try {

    const response = yield call(
      axios.get,
      `${BASE_URL}${COLLECTION_ENDPOINTS.LIST}`
    );

    const data = response.data;

    if (data?.success && data?.flage === "Y") {

      yield put(collectionSuccess(data.collection));

    } else {

      yield put(collectionFailure("Failed to load collections"));

    }

  } catch (error) {

    yield put(collectionFailure(error.message));

  }

}

export function* watchCollectionSaga() {

  yield takeLatest(collectionRequest.type, fetchCollections);

}