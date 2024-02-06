import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    if (e.target.elements.search.value === '') {
      toast.error('Empty string!! ');
      return;
    }
    onSubmit(e.target.elements.search.value);
    e.target.reset();
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit}  className={css.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          className={css.input}
        />
        <button className={css.btn} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
