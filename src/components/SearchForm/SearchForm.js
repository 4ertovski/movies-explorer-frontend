import React, { useState, useEffect } from 'react';
import './SearchForm.css'
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from 'react-router-dom';

const SearchForm = ({ onSearchMovies, onFilter, isShortMovies }) => {
    const [isQueryError, setIsQueryError] = useState(false);
    const [query, setQuery] = useState('');
    const location = useLocation();

    function handleChangeQuery(e) {
        setQuery(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (query.trim().length === 0) {
            setIsQueryError(true);
        } else {
            setIsQueryError(false);
            onSearchMovies(query);
        }
    }

    useEffect(() => {
        if (location.pathname === '/movies' && localStorage.getItem('movieSearch')) {
            const localQuery = localStorage.getItem('movieSearch');
            setQuery(localQuery);
        }
    }, [location]);

    return(
        <section className={'search'}>
            <form className='search__form' onSubmit={handleSubmit}>
                <div className='search__bar'>
                    <input
                        className='search__input'
                        id='search-input'
                        type='text'
                        placeholder='Фильм'
                        required={true}
                        onChange={handleChangeQuery}
                        value={query || ''}
                    />
                    <button className='search__button' onClick={onSearchMovies} type='submit'></button>
                </div>
                <FilterCheckbox onFilter={onFilter} isShortMovies={isShortMovies}/>
                {isQueryError && <span className="search__form-error">Нужно ввести ключевое слово</span>}
            </form>
        </section>
    )
}

export default SearchForm