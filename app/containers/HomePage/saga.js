import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { fetchInfoError, fetchInfoSuccess } from './actions';

import { FETCH_INFO } from './constants';

function* fetchInfo(action) {
  const { username } = action;

  const options = {
    method: 'GET',
    url: `/users/${username}/repos?type=all&sort=updated`,
  };

  try {
    const res = yield call(request, options);
    yield put(fetchInfoSuccess(res));
  } catch (e) {
    yield put(fetchInfoError());
  }
}

export default function* createHomePageSaga() {
  yield takeLatest(FETCH_INFO, fetchInfo);
}
