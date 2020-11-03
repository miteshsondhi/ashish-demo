import { FETCH_INFO, FETCH_INFO_ERROR, FETCH_INFO_SUCCESS } from './constants';

export function fetchInfo(username) {
  return {
    type: FETCH_INFO,
    username,
  };
}

export function fetchInfoSuccess(data) {
  return {
    type: FETCH_INFO_SUCCESS,
    data,
  };
}

export function fetchInfoError() {
  return {
    type: FETCH_INFO_ERROR,
  };
}
