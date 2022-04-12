import { ARTICLES_URL, FEED_URL } from './urls';
import axios from 'axios';

const create = (payload) => axios.post(ARTICLES_URL, payload);
const articles = (query) => axios.get(`${ARTICLES_URL}${query}`);
const article = (slug) => axios.get(`${ARTICLES_URL}/${slug}`);
const feed = (query) => axios.get(`${FEED_URL}${query}`);
const addFavourite = (slug) => axios.post(`${ARTICLES_URL}/${slug}/favorite`);
const removeFavourite = (slug) =>
  axios.delete(`${ARTICLES_URL}/${slug}/favorite`);
const destroy = (slug) => axios.delete(`${ARTICLES_URL}/${slug}`);
const update = (slug, payload) => axios.put(`${ARTICLES_URL}/${slug}`, payload);

const articlesApi = {
  create: create,
  articles: articles,
  article: article,
  addFavourite: addFavourite,
  removeFavourite: removeFavourite,
  feed: feed,
  destroy: destroy,
  update: update,
};
export default articlesApi;
