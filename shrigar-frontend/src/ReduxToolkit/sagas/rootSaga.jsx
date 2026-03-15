import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./authSaga";
import { watchCollectionSaga } from "./collectionSaga";

export default function* rootSaga() {
  yield all([
    watchAuthSaga(),
    watchCollectionSaga()
  ]);
}