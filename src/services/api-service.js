const API_KEY = '27792321-2960889e1be9eac4cb5e657cd';
const BASE_URL = 'https://pixabay.com/api';

export const apiService = (img, page) => {
return fetch(
    `${BASE_URL}/?q=${img}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
)
    .then(response => {
    if (!response.ok) {
        Promise.reject(`Not foud`);
    }

    return response.json();
    })
    
}