import { put, spawn, retry, takeEvery } from "redux-saga/effects";
import servicesListCreators from "./actionCreators/servicesList";
import servicesDetailsCreators from "./actionCreators/servicesDetails";
import * as apiCalls from "./apiCalls";

function* servicesListSaga() {
  function* worker() {
    try {
      const list = yield retry(2, 500, apiCalls.servicesList);
      yield put(servicesListCreators.requestSucceeded(list));
    } catch (e) {
      yield put(servicesListCreators.requestFailed(e));
    }
  }
  yield takeEvery("services-list request-initiate", worker);
}

function* servicesDetailsSaga() {
  function* worker({ payload }) {
    try {
      const details = yield retry(2, 500, apiCalls.servicesDetails, payload.id);
      yield put(servicesDetailsCreators.loadSucceeded(payload.id, details));
    } catch (e) {
      yield put(servicesDetailsCreators.loadFailed(payload.id, e));
    }
  }
  yield takeEvery("services-details load-initiate", worker);
}

export default function* masterSaga() {
  yield spawn(servicesListSaga);
  yield spawn(servicesDetailsSaga);
}
