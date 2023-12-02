import {Storage} from './storage';

/**
 * @class LocalStorage
 */

export class LocalStorage extends Storage {
  set(key, value) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Set state error: ', error.message);
    }
  }
  get(key) {
    try {
      const storageValue = localStorage.getItem(key);
      return storageValue === null ? undefined : JSON.parse(storageValue);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Set state error: ', error.message);
    }
  }
  remove(key) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
