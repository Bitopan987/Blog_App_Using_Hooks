import { ARTICLES_URL } from './urls';
import axios from 'axios';

const create = (slug, payload) =>
  axios.post(`${ARTICLES_URL}/${slug}/comments`, payload);
const destroy = (slug, id) =>
  axios.delete(`${ARTICLES_URL}/${slug}/comments/${id}`);
const comments = (slug) => axios.get(`${ARTICLES_URL}/${slug}/comments`);

const commentsApi = {
  create: create,
  destroy: destroy,
  comments: comments,
};
export default commentsApi;
