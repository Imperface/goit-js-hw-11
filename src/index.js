import { getRefs } from './js/refs';
import { renderGalleryCards } from './js/render-gallery-cards';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { clearContainer } from './js/clear-container';
import PixabayApiService from './js/pixabay-api-service';
import { hideElement, showElement } from './js/hide-show-element';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { createGallery } from './js/gallery-create';
const refs = getRefs();
hideElement(refs.loadMoreBtn);
hideElement(refs.spanResultEnd);
hideElement(refs.btnContainer);
const pixabayApiService = new PixabayApiService();

const onSearchForm = e => {
  e.preventDefault();
  clearContainer(refs.gallery);
  hideElement(refs.loadMoreBtn);
  hideElement(refs.spanResultEnd);
  hideElement(refs.btnContainer);
  const searchQuery = refs.searchInput.value;

  if (!searchQuery) {
    Notify.failure('Search query cannot be empty');
    return;
  }

  pixabayApiService.resetPage();
  pixabayApiService.resetHits();
  pixabayApiService.query = searchQuery;

  pixabayApiService
    .fetchPhotos()
    .then(renderGalleryCards)
    .then(r => {
      let gallery = new SimpleLightbox('.gallery a', {
        sourceAttr: 'href',
        scrollZoom: false,
        captions: true,
        captionDelay: 250,
        captionSelector: 'img',
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
      });

      showElement(refs.btnContainer);

      if (pixabayApiService.checkHits()) {
        showElement(refs.spanResultEnd);
        hideElement(refs.loadMoreBtn);
        return;
      }
      hideElement(refs.spanResultEnd);
      showElement(refs.loadMoreBtn);
    });
};

const onLoadMoreBtnClick = e => {
  if (pixabayApiService.checkHits()) {
    pixabayApiService.resetHits();
    showElement(refs.btnContainer);
    showElement(refs.spanResultEnd);
    return;
  }

  pixabayApiService.incrementPage();
  pixabayApiService
    .fetchPhotos()
    .then(renderGalleryCards)
    .then(r => {
      let gallery = new SimpleLightbox('.gallery a', {
        sourceAttr: 'href',
        scrollZoom: false,
        captions: true,
        captionDelay: 250,
        captionSelector: 'img',
        captionType: 'attr',
        captionsData: 'alt',
        captionPosition: 'bottom',
      });
      if (pixabayApiService.checkHits()) {
        showElement(refs.spanResultEnd);
        hideElement(refs.loadMoreBtn);
        return;
      }
    });
};

refs.searchForm.addEventListener('submit', onSearchForm);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
