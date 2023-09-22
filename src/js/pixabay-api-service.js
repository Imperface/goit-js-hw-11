import BASE_URL from './base-url';
import axios from 'axios';
import API_KEY from './api-key';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
    this.currentHits = 0;
  }
  async fetchPhotos() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientatino: 'horizontal',
      page: this.page,
      per_page: 40,
      safesearch: true,
    });

    const endpoint = BASE_URL + params.toString();
    try {
      const axiosQuery = await axios.get(endpoint);

      this.currentHits += axiosQuery.data.hits.length;
      this.totalHits = axiosQuery.data.totalHits;

      return axiosQuery.data.hits;
    } catch {
      console.log('Fetch error');
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  checkHits() {
    if (this.currentHits >= this.totalHits) {
      return true;
    }
    return false;
  }
  resetHits() {
    this.totalHits = 0;
    this.currentHits = 0;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQueryValue) {
    this.searchQuery = newQueryValue;
  }
}
