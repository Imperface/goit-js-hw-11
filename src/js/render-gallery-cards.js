import { clearContainer } from './clear-container';
import { getRefs } from './refs';
export const renderGalleryCards = data => {
  const refs = getRefs();
  if (!data.length) {
    refs.searchForm.reset();
    clearContainer(refs.gallery);
    throw new Error();
  }

  const markup = data
    .map(
      item =>
        `<li class="gallery__item photo-card">
        <a class="gallery__link" href="${item.largeImageURL}">
        <img class = "gallery__image" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b><br>${item.likes}
          </p>
          <p class="info-item">
            <b>Views</b><br>${item.views}
          </p>
          <p class="info-item">
            <b>Comments</b><br>${item.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b><br>${item.downloads}
          </p>
        </div>
        </a>
      </li>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
};
