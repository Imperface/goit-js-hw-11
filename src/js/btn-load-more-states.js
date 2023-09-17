import { getRefs } from './refs';
const refs = getRefs();
export const showLoadMoreBtn = () => {
  refs.btnContainer.classList.replace('load-more-hidden', 'load-more');
};
export const hideLoadMoreBtn = () => {
  refs.btnContainer.classList.replace('load-more', 'load-more-hidden');
};
