import React, { useState, useEffect } from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import './Movies.css';
import { filterMovies, filterDuration } from '../../utils/utils';

import * as movies from '../../utils/MoviesApi';


const Movies = ({isLoggedIn, handleLikeClick, savedMovies, onCardDelete }) => {
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
            } else {
                setFilteredMovies(filterDuration(initialMovies));
            }
        } else {
            setFilteredMovies(initialMovies);
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
            handleFilterMovies(movies, query, isShortMovies);
        } else {
            setIsLoading(true);
            movies
                .getCards()
                .then((cardsData) => {
                    handleFilterMovies(cardsData, query, isShortMovies);
                    setIsReqErr(false);
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
            setIsNotFound(true);
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
            <Header isLoggedIn={isLoggedIn} />
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

// DONE