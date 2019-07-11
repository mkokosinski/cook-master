import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

import './SearchInput.scss'
import magnifier from '../../assets/img/magnifier.svg'


const suggestions = [
  {
    text: 'Apple'
  },
  {
    text: 'App'
  },
  {
    text: 'Banana'
  },
  {
    text: 'Cherry'
  },
  {
    text: 'Grapefruit'
  },
  {
    text: 'Lemon'
  }
];

// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0 ? [] : languages.filter(lang =>
//     lang.name.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

const getSuggestionValue = suggestion => suggestion.text;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.text}
  </div>
);

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : suggestions.filter(lang =>
    lang.text.toLowerCase().slice(0, inputLength) === inputValue
  );
};


const SearchInput = () => {
  const [value, setValue] = useState('')
  const [prp, setPrp] = useState([])

  const onChange = (event, { newValue })=>{
    setValue(newValue)
  }


  const inputProps = {
    placeholder: 'Type a programming language',
    value,
    onChange
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    console.log('elo',value);
    
    setPrp(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setPrp([]);
  };

  return (
    <div className="search-input">


      <Autosuggest
        suggestions={prp}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        className='test'
      />




      {/* <input type="text"
        name="searchInput"
        autoComplete='off'
        placeholder="Np. Hartowanie, przepis na żurek..." /> */}
      <div className="magnifier">
        <img src={magnifier} alt="S" />
      </div>
    </div>
  );
}

export default SearchInput;

