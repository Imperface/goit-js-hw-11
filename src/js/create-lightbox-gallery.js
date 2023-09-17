import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
export const createLightboxGallery = () => {
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
};
