import axios from 'axios';

export const fetchImage = async (query, page) => {
  const response = await axios.get(
    `https://api.unsplash.com/search/photos?client_id=6pOdlJkpx9PpN6TFSFfr4_1nGjxaoR4NzBABU7DGekA&query=${query}&orientation=landscape&page=${page}&per_page=20`
  );
  return response.data.results;
};
