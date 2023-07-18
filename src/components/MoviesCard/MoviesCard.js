import React from 'react';
import { durationConverter } from '../../utils/utils';
import './MoviesCard.css'

const MoviesCard = ({card, isSavedFilms, handleLikeClick, onCardDelete, saved, savedMovies}) =>{
    function onCardClick() {
        if (saved) {
            onCardDelete(savedMovies.filter((m) => m.movieId === card.id)[0]);
        } else {
            handleLikeClick(card);
        }
    }

    function onDelete() {
        onCardDelete(card);
    }

    const cardSaveButtonClassName = `${ saved ? 'card__save-button card__save-button_active' : 'card__save-button'}`;

    return (
        <li className='card'>
            <a href={card.trailerLink} target="_blank" rel="noreferrer">
                <img
                    className="card__image"
                    alt={card.nameRU}
                    src={isSavedFilms ? card.image : `https://api.nomoreparties.co/${card.image.url}`}
                />
            </a>
            <div className='card__container'>
                <div className='card__info'>
                    <h2 className='card__text'>{card.nameRU}</h2>
                    <span className='card__length'>{durationConverter(card.duration)}</span>
                </div>
                {isSavedFilms ? (
                    <button type="button" className='card__remove-button' onClick={onDelete}></button>
                ) : (
                    <button type="button" className={cardSaveButtonClassName} onClick={onCardClick}></button>
                )
                    }
            </div>
        </li>
    )
}

export default MoviesCard

// DONE
// TODO поменять местами картинку и длительность, выровнять расстояние между названием фильма и длительностью