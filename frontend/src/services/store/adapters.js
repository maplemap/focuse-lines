import {useContext} from 'react';
import {AppContext} from './provider';

export const useAppStore = () => useContext(AppContext);
