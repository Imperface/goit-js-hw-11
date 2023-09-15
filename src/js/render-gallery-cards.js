import { getRefs } from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const renderGalleryCards = data => {
  refs = getRefs();
  if (!data.length) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.searchForm.reset();
    refs.gallery.innerHTML = '';
    return;
  }

  const markup = data
    .map(
      item =>
        `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes<br>${item.likes}</b>
          </p>
          <p class="info-item">
            <b>Views<br>${item.views}</b>
          </p>
          <p class="info-item">
            <b>Comments<br>${item.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads<br>${item.downloads}</b>
          </p>
        </div>
      </div>`
    )
    .join('');

  refs.gallery.innerHTML = markup;
};
