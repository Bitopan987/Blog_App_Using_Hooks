import { ARTICLES_URL, PROFILE_URL, USER_VERIFY_URL } from './urls';
import axios from 'axios';

const profile = (id) => axios.get(`${PROFILE_URL}${id}`);
const articles = (query) => axios.get(`${ARTICLES_URL}${query}`);
const follow = (username) => axios.post(`${PROFILE_URL}${username}/follow`);
const unfollow = (username) => axios.delete(`${PROFILE_URL}${username}/follow`);
const addFavourite = (slug) => axios.post(`${ARTICLES_URL}/${slug}/favorite`);
const removeFavourite = (slug) =>
  axios.delete(`${ARTICLES_URL}/${slug}/favorite`);
const update = (payload) => axios.put(`${USER_VERIFY_URL}`, payload);

const profileApi = {
  profile: profile,
  articles: articles,
  follow: follow,
  unfollow: unfollow,
  addFavourite: addFavourite,
  removeFavourite: removeFavourite,
  update: update,
};
export default profileApi;
