import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import eventsSlice from '../reducers/eventsSlice';
import resourcesSlice from '../reducers/resourcesSlice';
import { eventsSaga, clearEventsSaga } from '../sagas/eventsSaga';
import { resourcesSaga, clearResourcesSaga } from '../sagas/resourcesSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: { events: eventsSlice, resources: resourcesSlice },
  middleware: [saga],
});

saga.run(eventsSaga);
saga.run(clearEventsSaga);
saga.run(resourcesSaga);
saga.run(clearResourcesSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
