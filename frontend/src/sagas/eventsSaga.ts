import { put, call, takeEvery } from 'redux-saga/effects';
import getEvents from '../services/getEvents';
import {
  clearEvents,
  fetchEventsFail,
  fetchEventsSuccess,
} from '../reducers/eventsSlice';

function* workEventsFetch(): IterableIterator<any> {
  try {
    const events = yield call(getEvents);
    yield put(fetchEventsSuccess(events));
  } catch (err) {
    yield put(fetchEventsFail(err));
  }
}

function* eventsSaga() {
  yield takeEvery('events/fetchEvents', workEventsFetch);
}

function* workEventsClear(): IterableIterator<any> {
  yield call(clearEvents);
}

function* clearEventsSaga() {
  yield takeEvery('events/clearEvents', workEventsClear);
}

export { eventsSaga, clearEventsSaga };
