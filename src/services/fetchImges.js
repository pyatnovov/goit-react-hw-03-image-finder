const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32926436-c6ecc5f5fc4edb6e5a87cae88';

export const FetchImg = (inputValue, page) => {
  return fetch(
    `${BASE_URL}?q=${inputValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
