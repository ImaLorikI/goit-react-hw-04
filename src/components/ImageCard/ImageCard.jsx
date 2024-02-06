import css from './ImageCard.module.css';
export const ImageCard = ({ info, clickModal }) => {
  return (
    <>
      {info.map(info => (
        <li key={info.id} onClick={() => clickModal(info.id)}>
          <div >
            <img className={css.img} src={info.urls.small} alt={info.alt_description} />
          </div>
        </li>
      ))}
    </>
  );
};
