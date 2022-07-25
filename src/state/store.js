import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { useDispatch, useSelector } from "react-redux";
import createSagaMiddleware from "redux-saga";

import servicesList from "./reducers/servicesList";
import servicesDetails from "./reducers/servicesDetails";
import servicesListCreators from "./actionCreators/servicesList";
import servicesDetailsCreators from "./actionCreators/servicesDetails";
import masterSaga from "./sagas";

export function useStateAccess() {
  const dispatch = useDispatch();
  return {
    servicesList: useSelector(s => s.servicesList),
    servicesDetails: useSelector(s => s.servicesDetails),
    requestServicesList: () => dispatch(servicesListCreators.requestInitiate()),
    loadServiceDetails: id => dispatch(servicesDetailsCreators.loadInitiate(id))
  };
};

const masterReducer = combineReducers({
  servicesList,
  servicesDetails
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store = createStore(masterReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(masterSaga);

export default store;
