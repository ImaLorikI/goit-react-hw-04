import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');
export const ImageModal = ({ openModal, closeModal, data }) => {
  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={css.modal}
      >
        <img src={data.urls.regular} alt={data.alt_description} />
      </Modal>
    </div>
  );
};
