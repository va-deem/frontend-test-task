import { put, call, takeEvery } from 'redux-saga/effects';
import getResources from '../services/getResources';
import {
  fetchResourcesFail,
  fetchResourcesSuccess,
} from '../reducers/resourcesSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { clearEvents } from '../reducers/eventsSlice';

function* workResourcesFetch(action: AnyAction): IterableIterator<any> {
  try {
    const resources = yield call(() => getResources(action.payload));
    yield put(fetchResourcesSuccess(resources));
  } catch (err) {
    yield put(fetchResourcesFail(err));
  }
}

function* resourcesSaga() {
  yield takeEvery('resources/fetchResources', workResourcesFetch);
}

function* workResourcesClear(): IterableIterator<any> {
  yield call(clearEvents);
}

function* clearResourcesSaga() {
  yield takeEvery('events/clearResources', workResourcesClear);
}

export { resourcesSaga, clearResourcesSaga };
