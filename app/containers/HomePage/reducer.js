import produce from 'immer';
import { FETCH_INFO, FETCH_INFO_ERROR, FETCH_INFO_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  data: null,
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FETCH_INFO:
        draft.loading = true;
        break;
      case FETCH_INFO_SUCCESS:
        draft.data = action.data;
        draft.loading = false;
        break;
      case FETCH_INFO_ERROR:
        draft.loading = false;
        break;
    }
  });

export default homePageReducer;
