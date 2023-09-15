import BASE_URL from './base-url';
import axios from 'axios';
import API_KEY from './api-key';

export const fetchPixabayApi = (q, page = 1) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientatino: 'horizontal',
    page,
    per_page: 40,
    safesearch: true,
  });

  const endpoint = BASE_URL + params.toString();
  return axios
    .get(endpoint)
    .then(r => r.data.hits)
    .catch(error => console.log(error.message));
};
