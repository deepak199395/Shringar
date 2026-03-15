import { all } from "redux-saga/effects";
import { watchAuthSaga } from "./authSaga";
import { watchCollectionSaga } from "./collectionSaga";
import { watchProductSaga } from "./productSaga";
import { watchOrderSaga } from "./orderSaga";

export default function* rootSaga() {

  yield all([
    watchAuthSaga(),
    watchCollectionSaga(),
    watchProductSaga(),
    watchOrderSaga()
   ]);

}