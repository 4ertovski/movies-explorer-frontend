import { SHORT_MOVIES } from './constants';

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
};

export function filterMovies(movies, query) {
    const moviesByQuery = movies.filter((movie) => {
        const movieRu = String(movie.nameRU).toLowerCase().trim();
        const movieEn = String(movie.nameEN).toLowerCase().trim();
        const userQuery = query.toLowerCase().trim();
        return movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1;
    });
    return moviesByQuery;
}

export function filterDuration(movies) {
    return movies.filter((movie) => movie.duration < SHORT_MOVIES);
}

export function durationConverter(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч${minutes}м`;
}