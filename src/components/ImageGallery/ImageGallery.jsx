import { ImageCard } from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ gallery, clickModal }) => {
  return (
    <ul className={css.list}>
      <ImageCard info={gallery} clickModal={clickModal} />
    </ul>
  );
};
