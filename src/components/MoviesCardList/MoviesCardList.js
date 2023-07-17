import React, { useEffect, useState } from 'react';
import Preloader from "../Preloader/Preloader";
import {Fragment} from "react";
import { useLocation } from 'react-router-dom';
import MoviesCard from "../MoviesCard/MoviesCard";
import './MoviesCardList.css'
import SearchError from '../SearchError/SearchError';
import { MORE_MOVIES_DESKTOP, MORE_MOVIES_TABLET, MORE_MOVIES_MOBILE } from '../../utils/constants';
const MoviesCardList = ({cards, isSavedFilms, isLoading, isReqErr, isNotFound, handleLikeClick, savedMovies, onCardDelete}) => {
   /* const isLoading = false;*/
    const [shownMovies, setShownMovies] = useState(0);
    const { pathname } = useLocation();

    function shownCount() {
        const display = window.innerWidth;
        if (display > 1180) {
            setShownMovies(16);
        } else if (display > 1023) {
            setShownMovies(12);
        } else if (display > 800) {
            setShownMovies(8);
        } else if (display < 800) {
            setShownMovies(5);
        }
    }

    useEffect(() => {
        shownCount();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.addEventListener('resize', shownCount);
        }, 500);
    });

    function showMore() {
        const display = window.innerWidth;
        if (display > 1180) {
            setShownMovies(shownMovies + MORE_MOVIES_DESKTOP);
        } else if (display > 1023) {
            setShownMovies(shownMovies + MORE_MOVIES_TABLET);
        }
        else if (display < 1023) {
            setShownMovies(shownMovies + MORE_MOVIES_MOBILE);
        }
    }

    function getSavedMovieCard(savedMovies, card) {
        return savedMovies.find((savedMovie) => savedMovie.movieId === card.id);
    }

    return(
        <section className='cards'>
            {isLoading && <Preloader />}
            {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
            {isReqErr && !isLoading && (
                <SearchError
                    errorText={
                        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
                    }
                />
            )}
            {!isLoading && !isReqErr && !isNotFound && (
                <Fragment>
                    {pathname === '/saved-movies' ? (
                <Fragment>
                <ul className= 'cards__list'>
                    {cards.map((card)=>(
                        <MoviesCard key={isSavedFilms ? card._id : card.id}
                                    saved={getSavedMovieCard(savedMovies, card)}
                                    cards={cards}
                                    card={card}
                                    isSavedFilms={isSavedFilms}
                                    handleLikeClick={handleLikeClick}
                                    onCardDelete={onCardDelete}
                                    savedMovies={savedMovies}/>
                    ))}
                </ul>
                    <div className='cards__button-container'></div>
                </Fragment>
                    ) : (
                        <Fragment>
                            <ul className= 'cards__list'>
                                {cards.slice(0, shownMovies).map((card) => (
                                    <MoviesCard
                                        key={isSavedFilms ? card._id : card.id}
                                        saved={getSavedMovieCard(savedMovies, card)}
                                        cards={cards}
                                        card={card}
                                        isSavedFilms={isSavedFilms}
                                        handleLikeClick={handleLikeClick}
                                        onCardDelete={onCardDelete}
                                        savedMovies={savedMovies}
                                    />
                                ))}
                            </ul>
                        <div className='cards__button-container'>
                            {cards.length > shownMovies ? ( <button className='cards__button-more' onClick={showMore}>Ещё</button>
                            ) : (
                            ''
                            )}
                </div>
                </Fragment>
                )}
        </Fragment>
    )}
</section>
);
}

export default MoviesCardList

// CHECK & UPDATE
