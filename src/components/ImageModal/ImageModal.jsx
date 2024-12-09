import Modal from 'react-modal';
import s from './ImageModal.module.css';

Modal.setAppElement("#root");

const ImageModal = ({ modalIsOpen, closeModal, image }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
          className={s.modal}
      overlayClassName={s.overlay} 
          contentLabel={(image && image.description) || "Image modal"}
          onRequestClose={closeModal}
      >
       {image && (
        <div className={s.modal}>
          <img
            src={image.urls.regular}
            alt={image.description}
                      className={s.modalImage}
                      onClick={() => modalIsOpen(image)}
          />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;