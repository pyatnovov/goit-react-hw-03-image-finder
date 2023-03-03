import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';

export function ImageGallery({ images }) {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
}
ImageGallery.propTypes = {
  items: PropTypes.array,
};
