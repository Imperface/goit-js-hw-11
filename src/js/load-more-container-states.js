import { getRefs } from './refs';
const refs = getRefs();

const hideElement = ref => ref.classList.add('hidden');

const showElement = ref => ref.classList.remove('hidden');

export const loadMoreContainerHideAll = () => {
  hideElement(refs.loadMoreContainer);
  hideElement(refs.loadMoreBtn);
  hideElement(refs.loadMoreSpan);
};

export const loadMoreContainerHideBtn = () => {
  showElement(refs.loadMoreContainer);
  showElement(refs.loadMoreSpan);
  hideElement(refs.loadMoreBtn);
};
export const loadMoreContainerHideSpan = () => {
  showElement(refs.loadMoreContainer);
  hideElement(refs.loadMoreSpan);
  showElement(refs.loadMoreBtn);
};
