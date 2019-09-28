import React, { useState, useEffect } from "react"
import Autosuggest from "react-autosuggest"
import { getAutoCompleteList } from "../../services/api"
import magnifier from "../../images/magnifier.svg"
import "./SearchInput.scss"
import { Link } from 'gatsby';

const getSuggestionValue = suggestion => suggestion.title

const renderSuggestion = suggestion => (
<Link to={suggestion.link}>{suggestion.title}</Link>
)
const SearchInput = () => {
  const [value, setValue] = useState("")
  const [prp, setPrp] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    getAutoCompleteList().then(list => {
      setSuggestions(list)
    })
  }, [])

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : suggestions.filter(
          lang => lang.title.toLowerCase().slice(0, inputLength) === inputValue
        )
  }

  const inputProps = {
    placeholder: "Type a programming language",
    value,
    onChange,
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setPrp(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setPrp([])
  }

  return (
    <div className="search-input">
      <Autosuggest
        suggestions={prp}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        className="test"
      />

      {/* <input type="text"
        name="searchInput"
        autoComplete='off'
        placeholder="Np. Hartowanie, przepis na żurek..." /> */}
      <div className="magnifier">
        <img src={magnifier} alt="S" />
      </div>
    </div>
  )
}

export default SearchInput
