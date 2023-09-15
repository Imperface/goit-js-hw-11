import { getRefs } from './js/refs';
import { fetchPixabayApi } from './js/fetch-pixabay-api';
import { renderGalleryCards } from './js/render-gallery-cards';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = getRefs();
const onSearchBtnClick = e => {
  e.preventDefault();
  const searchQuery = refs.searchInput.value;
  if (!searchQuery) {
    Notify.failure('Search query cannot be empty');
    return;
  }
  fetchPixabayApi(searchQuery).then(renderGalleryCards);
};

refs.searchBtn.addEventListener('click', onSearchBtnClick);

// const onLoadMoreBtnClick = e => {
//   e.preventDefault();
//   fetchPixabayApi(sea);
// };
// refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
