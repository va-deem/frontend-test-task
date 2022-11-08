import { createSlice } from '@reduxjs/toolkit';
import { IResource } from '../types/types';
import { AxiosError } from 'axios';

export interface ResourceState {
  data: IResource[];
  isLoading: boolean;
  errors: Error | AxiosError | null;
}

const initialState: ResourceState = {
  data: [],
  isLoading: false,
  errors: null,
};

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    fetchResources(state, _action) {
      state.isLoading = true;
    },
    fetchResourcesSuccess(state, action) {
      state.data = state.data.concat(action.payload?.data?.items);
      state.isLoading = false;
    },
    fetchResourcesFail(state, action) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    clearResources: (state) => {
      state.data = [];
    },
  },
});

export const {
  fetchResources,
  fetchResourcesSuccess,
  fetchResourcesFail,
  clearResources,
} = resourcesSlice.actions;

export default resourcesSlice.reducer;
