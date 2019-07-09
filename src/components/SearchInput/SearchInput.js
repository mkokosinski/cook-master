import React from 'react';

import './SearchInput.scss'
import magnifier from '../../assets/img/magnifier.svg'

const SearchInput = () => {
    return (
        <div className="search-input">
            <input type="text"
                name="searchInput"
                autoComplete='off'
                placeholder="Np. Hartowanie, przepis na żurek..." />
            <div className="magnifier">
                <img src={magnifier} alt="S" />
            </div>
        </div>
    );
}

export default SearchInput;