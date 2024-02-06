import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
import { ErrorMassage } from './ErrorMassage/ErrorMassage';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from './ImageModal/ImageModal';

export const App = () => {
  const [search, setSearch] = useState({
    items: [],
    loading: false,
    error: false,
  });
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataPhotoModal, setDataPhotoModal] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const onClickModal = id => {
    setDataPhotoModal(search.items.find(el => el.id === id));
    console.log(dataPhotoModal);
    openModal();
  };

  const searchBar = async newQuery => {
    setQuery(newQuery);
    setPage(1);
    setSearch({
      items: [],
      loading: true,
      error: false,
    });
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchData() {
      try {
        setSearch(prev => ({ ...prev, loading: true, error: false }));
        const response = await axios.get(
          `https://api.unsplash.com/search/photos?client_id=6pOdlJkpx9PpN6TFSFfr4_1nGjxaoR4NzBABU7DGekA&query=${query}&orientation=landscape&page=${page}&per_page=20`
        );
        setSearch(prev => {
          return {
            ...prev,
            items: [...prev.items, ...response.data.results],
          };
        });
      } catch (error) {
        setSearch(prev => {
          return {
            ...prev,
            error: true,
          };
        });
      } finally {
        setSearch(prev => {
          return {
            ...prev,
            loading: false,
          };
        });
      }
    }
    fetchData();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  return (
    <>
      <SearchBar onSubmit={searchBar} />
      {search.loading && <Loader />}
      {search.error && (
        <ErrorMassage massage={'Oops,there was an error,please try reloading page'} />
      )}
      {search.items.length > 0 && <ImageGallery gallery={search.items} clickModal={onClickModal} />}
      <Toaster position="top-right" reverseOrder={false} />
      {search.items.length > 0 && !search.loading && <LoadMoreBtn loadMore={handleLoadMore} />}
      {modalIsOpen && (
        <ImageModal openModal={modalIsOpen} data={dataPhotoModal} closeModal={closeModal} />
      )}
    </>
  );
};
