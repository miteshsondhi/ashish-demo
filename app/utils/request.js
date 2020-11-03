/* eslint-disable no-param-reassign */
import axios from 'axios';
import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/mint.css';

export const axiosInstance = axios.create({
  baseURL: 'https://api.github.com', //eslint-disable-line
  responseType: 'json',
});

axiosInstance.interceptors.response.use(
  response => {
    if (response.data) return response.data;
    return response;
  },
  err => {
    new Noty({
      type: 'error',
      text: 'something went wrong',
      timeout: 1000,
    }).show();

    return Promise.reject(err);
  },
);

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(options) {
  return axiosInstance(options);
}
