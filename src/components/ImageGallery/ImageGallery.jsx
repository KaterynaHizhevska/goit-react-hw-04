import s from './ImageGallery.module.css'
import ImageCard from '../ImageCard/ImageCard'

export const ImageGallery = ({ images, openModal }) => {
    return (
        <ul className={s.gallery}>
            <li>
                <div className={s.containerGallery}>
                   {images.map((image) => {
            return (
              <ImageCard
                className={s.imageCard}
                key={image.id}
                src={image.urls.small}
                alt={image.description}
                onClick={() => openModal(image)}
              />
            );
          })} 
                </div>
            </li>
        </ul>
    )
}

export default ImageGallery;