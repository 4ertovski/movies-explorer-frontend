import React, { useState, useEffect } from 'react';
import './SavedMovies.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { filterMovies, filterDuration } from '../../utils/utils';

const SavedMovies = ({ isLoggedIn, savedMovies, onCardDelete }) => {
    const [filteredMovies, setFilteredMovies] = useState(savedMovies); //отфильтрованные по запросу и чекбоксу
    const [isShortMovies, setIsShortMovies] = useState(false); //включен ли чекбокс короткометражек
    const [isNotFound, setIsNotFound] = useState(false); //фильмы по запросу не найдены
    const [searchQuery, setSearchQuery] = useState('');

    function onSearchMovies(query) {
        setSearchQuery(query);
    }

    function handleShortMovies() {
        setIsShortMovies(!isShortMovies);
    }

    useEffect(() => {
        const moviesList = filterMovies(savedMovies, searchQuery);
        setFilteredMovies(isShortMovies ? filterDuration(moviesList) : moviesList);
    }, [savedMovies, isShortMovies, searchQuery]);

    useEffect(() => {
        if (filteredMovies.length === 0) {
            setIsNotFound(true);
        } else {
            setIsNotFound(false);
        }
    }, [filteredMovies]);

    return(
        <section className='movies'>
            <Header isLoggedIn={isLoggedIn}/>
            <SearchForm onSearchMovies={onSearchMovies} onFilter={handleShortMovies}/>
            <MoviesCardList
                isNotFound={isNotFound}
                cards={filteredMovies}
                isSavedFilms={true}
                savedMovies={savedMovies}
                onCardDelete={onCardDelete}
            />
            <Footer/>
        </section>
    )
}

export default SavedMovies

// DONE