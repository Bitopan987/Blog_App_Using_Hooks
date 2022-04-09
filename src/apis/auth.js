import { USER_VERIFY_URL, REGISTER_URL, LOGIN_URL, ARTICLES_URL } from './urls';
import axios from 'axios';

const currentUser = () => axios.get(USER_VERIFY_URL);
const signup = (payload) => axios.post(REGISTER_URL, payload);
const login = (payload) => axios.post(LOGIN_URL, payload);
const newArticle = (payload) => axios.post(ARTICLES_URL, payload);

const authApi = {
  currentUser: currentUser,
  signup: signup,
  login: login,
  newArticle: newArticle,
};
export default authApi;
