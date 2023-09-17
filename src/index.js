import { getRefs } from './js/refs';
import { renderGalleryCards } from './js/render-gallery-cards';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { clearContainer } from './js/clear-container';
import { createLightboxGallery } from './js/create-lightbox-gallery';
import {
  loadMoreContainerHideAll,
  loadMoreContainerHideBtn,
  loadMoreContainerHideSpan,
} from './js/load-more-container-states';
import PixabayApiService from './js/pixabay-api-service';

const refs = getRefs();
loadMoreContainerHideAll();
const pixabayApiService = new PixabayApiService();

const onSearchForm = async e => {
  e.preventDefault();
  clearContainer(refs.gallery);
  loadMoreContainerHideAll();
  const searchQuery = refs.searchInput.value;

  if (!searchQuery) {
    Notify.failure('Search query cannot be empty');
    return;
  }

  pixabayApiService.resetPage();
  pixabayApiService.resetHits();

  pixabayApiService.query = searchQuery;
  try {
    const fetchedData = await pixabayApiService.fetchPhotos();

    renderGalleryCards(fetchedData);

    createLightboxGallery();

    if (pixabayApiService.checkHits()) {
      Notify.success(`Hooray! We found ${pixabayApiService.totalHits} images.`);
      loadMoreContainerHideBtn();
      return;
    }

    loadMoreContainerHideSpan();
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

const onLoadMoreBtnClick = async e => {
  loadMoreContainerHideAll();

  pixabayApiService.incrementPage();

  try {
    const fetchedData = await pixabayApiService.fetchPhotos();
    renderGalleryCards(fetchedData);
    createLightboxGallery();
  } catch {
    Notify.failure('Oops...Try reload page');
  }

  if (pixabayApiService.checkHits()) {
    loadMoreContainerHideBtn();
    return;
  }
  loadMoreContainerHideSpan();
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
