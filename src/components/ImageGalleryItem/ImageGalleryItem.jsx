import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.stuled';

export const ImageGalleryItem = ({ images, onClick }) => {
  return (
    <>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <GalleryItem key={id}>
            <GalleryImage
              src={webformatURL}
              alt={tags}
              onClick={() => onClick(largeImageURL)}
            />
          </GalleryItem>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
