import { ARTICLES_URL, FEED_URL } from './urls';
import axios from 'axios';

const create = (payload) => axios.post(ARTICLES_URL, payload);
const articles = (query) => axios.get(ARTICLES_URL + query);
const feed = (query) => axios.get(FEED_URL + query);
const addFavourite = (slug) => axios.post(`${ARTICLES_URL}${slug}/favorite`);
const removeFavourite = (slug) =>
  axios.delete(`${ARTICLES_URL}${slug}/favorite`);

const articlesApi = {
  create: create,
  articles: articles,
  addFavourite: addFavourite,
  removeFavourite: removeFavourite,
  feed: feed,
};
export default articlesApi;
