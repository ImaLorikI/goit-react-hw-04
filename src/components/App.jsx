import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { Loader } from './Loader/Loader';
import { ErrorMassage } from './ErrorMassage/ErrorMassage';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageModal } from './ImageModal/ImageModal';
import { fetchImage } from '../Api/Api';

export const App = () => {
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataPhotoModal, setDataPhotoModal] = useState([]);

  const searchBar = async newQuery => {
    setQuery(newQuery);
    setPage(1);
    setSearch([]);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const fetchedData = await fetchImage(query, page);
        setSearch(prev => [...prev, ...fetchedData]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const onClickModal = id => {
    setDataPhotoModal(search.find(el => el.id === id));
    console.log(dataPhotoModal);
    openModal();
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <>
      <SearchBar onSubmit={searchBar} />
      {search.length > 0 && <ImageGallery gallery={search} clickModal={onClickModal} />}
      {search.length > 0 && !loading && <LoadMoreBtn loadMore={handleLoadMore} />}
      {loading && <Loader />}
      {error && <ErrorMassage massage={'Oops,there was an error,please try reloading page'} />}
      <Toaster position="top-right" reverseOrder={false} />
      {modalIsOpen && (
        <ImageModal openModal={modalIsOpen} data={dataPhotoModal} closeModal={closeModal} />
      )}
    </>
  );
};
