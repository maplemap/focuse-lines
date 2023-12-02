import axios from 'axios';
import {AUTHORIZATION_TOKEN_KEY} from '@/constants';
import {localeStore} from '@/services/storage';

const getInstance = () => {
  const token = localeStore.get(AUTHORIZATION_TOKEN_KEY);

  return axios.create({
    baseURL: 'api/',
    headers: {Authorization: `Bearer ${token}`},
  });
};

export const get = (url, params) => {
  return getInstance().get(url, {params});
};

export const post = (url, data) => {
  return getInstance().post(url, data);
};

export const put = (url, data) => {
  return getInstance().put(url, data);
};

export const remove = (url, params) => {
  return getInstance().delete(url, {params});
};
