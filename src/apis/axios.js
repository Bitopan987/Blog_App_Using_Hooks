import axios from 'axios';
import LOCAL_STORAGE_KEY from '../utils/constants';
import { ROOT_URL } from './urls';

const authInitializer = () => {
  const authToken = localStorage.getItem(LOCAL_STORAGE_KEY);
  axios.defaults.baseURL = ROOT_URL;
  axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};
export default authInitializer;
