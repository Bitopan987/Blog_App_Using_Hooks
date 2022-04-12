import { TAGS_URL } from './urls';
import axios from 'axios';

const tags = () => axios.get(TAGS_URL);

const tagsApi = {
  tags: tags,
};

export default tagsApi;
