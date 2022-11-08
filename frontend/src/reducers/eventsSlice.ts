import { createSlice } from '@reduxjs/toolkit';
import { IEvent } from '../types/types';
import { AxiosError } from 'axios';

export interface EventState {
  data: IEvent[];
  isLoading: boolean;
  errors: Error | AxiosError | null;
}

const initialState: EventState = {
  data: [],
  isLoading: false,
  errors: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEvents(state) {
      state.isLoading = true;
    },
    fetchEventsSuccess(state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    fetchEventsFail(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    clearEvents: (state) => {
      state.data = [];
    },
  },
});

export const { fetchEvents, fetchEventsSuccess, fetchEventsFail, clearEvents } =
  eventsSlice.actions;

export default eventsSlice.reducer;
