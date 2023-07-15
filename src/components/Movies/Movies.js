import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css';
import { filterMovies, filterDuration } from '../../utils/utils';

import * as movies from '../../utils/MoviesApi';

/*import movieImage from '../../images/card-saved.png';

const movies123 = [
  { _id: 1, image: movieImage, title: '33 слова о дизайне', length: '1ч 42м', saved: true },
  { _id: 2, image: movieImage, title: 'Киноальманах «100 лет дизайна»', length: '1ч 42м', saved: true },
  { _id: 3, image: movieImage, title: 'В погоне за Бенкси', length: '1ч 42м', saved: false },
  { _id: 4, image: movieImage, title: 'Баския: Взрыв реальности', length: '1ч 42м', saved: false },
  { _id: 5, image: movieImage, title: 'Бег это свобода', length: '1ч 42м', saved: true },
  { _id: 6, image: movieImage, title: 'Книготорговцы', length: '1ч 42м', saved: false },
  { _id: 7, image: movieImage, title: 'Когда я думаю о Германии ночью', length: '1ч 42м', saved: false },
];*/

const Movies = ({loggedIn, handleLikeClick, savedMovies, onCardDelete }) => {
    const [isLoading, setIsLoading] = useState(false); //загрузка прелоадер
    const [initialMovies, setInitialMovies] = useState([]); //отфильтрованные по запросу
    const [filteredMovies, setFilteredMovies] = useState([]); //отфильтрованные по запросу и чекбоксу
    const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек

    const [isReqErr, setIsReqErr] = useState(false); //ошибка запроса к серверу
    const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
    //основной метод фильрации, который отдает массив с фильмами на рендеринг
    function handleFilterMovies(movies, query, short) {
        const moviesList = filterMovies(movies, query, short); //фильтруем полученный массив по запросу
        setInitialMovies(moviesList); //записываем в стейт
        setFilteredMovies(short ? filterDuration(moviesList) : moviesList); //если чекбокс тру, то фильруем по длине и записываем в стейт
        localStorage.setItem('movies', JSON.stringify(moviesList));
        localStorage.setItem('allMovies', JSON.stringify(movies));
    }

    function handleShortMovies() {
        setIsShortMovies(!isShortMovies);
        if (!isShortMovies) {
            if (filterDuration(initialMovies).length === 0) {
                setFilteredMovies(filterDuration(initialMovies));
                // setIsNotFound(true);
            } else {
                setFilteredMovies(filterDuration(initialMovies));
                // setIsNotFound(false);
            }
        } else {
            setFilteredMovies(initialMovies);
            // setIsNotFound(initialMovies.length === 0 ? true : false);
        }
        localStorage.setItem('shortMovies', !isShortMovies);
    }

    //submit
    function onSearchMovies(query) {
        console.log(query);

        localStorage.setItem('movieSearch', query);
        localStorage.setItem('shortMovies', isShortMovies);

        if (localStorage.getItem('allMovies')) {
            const movies = JSON.parse(localStorage.getItem('allMovies'));
            console.log('lo');
            handleFilterMovies(movies, query, isShortMovies);
        } else {
            console.log('nolo');
            setIsLoading(true);
            movies
                .getCards()
                .then((cardsData) => {
                    handleFilterMovies(cardsData, query, isShortMovies);
                    setIsReqErr(false);
                    // setAllMovies(cardsData);
                })
                .catch((err) => {
                    setIsReqErr(true);
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }

    useEffect(() => {
        if (localStorage.getItem('shortMovies') === 'true') {
            setIsShortMovies(true);
        } else {
            setIsShortMovies(false);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('movies')) {
            const movies = JSON.parse(localStorage.getItem('movies'));
            setInitialMovies(movies);
            if (localStorage.getItem('shortMovies') === 'true') {
                setFilteredMovies(filterDuration(movies));
            } else {
                setFilteredMovies(movies);
            }
        } else {
            // setIsNotFound(true);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('movieSearch')) {
            if (filteredMovies.length === 0) {
                setIsNotFound(true);
            } else {
                setIsNotFound(false);
            }
        } else {
            setIsNotFound(false);
        }
    }, [filteredMovies]);
    return(
        <section className='movies'>
            <Header loggedIn={loggedIn} />
            <SearchForm
                onSearchMovies={onSearchMovies}
                onFilter={handleShortMovies}
                isShortMovies={isShortMovies}/>
            <MoviesCardList
                savedMovies={savedMovies}
                cards={filteredMovies}
                isSavedFilms={false}
                isLoading={isLoading}
                isReqErr={isReqErr}
                isNotFound={isNotFound}
                handleLikeClick={handleLikeClick}
                onCardDelete={onCardDelete}/>
            <Footer/>
        </section>
    )
}

export default Movies