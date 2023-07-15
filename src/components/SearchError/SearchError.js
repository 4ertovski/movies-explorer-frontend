import React from 'react';
import './SearсhError.css';

function SearchError({ errorText }) {
    return <p className="search__error">{errorText}</p>;
}

export default SearchError;