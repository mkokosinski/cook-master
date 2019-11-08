import React, { useState, useEffect } from "react"
import Autosuggest from "react-autosuggest"
import magnifier from "../../images/magnifier.svg"
import "./SearchInput.scss"
import { Link, useStaticQuery, graphql } from "gatsby"

const getSuggestionValue = suggestion => suggestion.label

const SearchInput = () => {
  const [value, setValue] = useState("")
  const [prp, setPrp] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const query = useStaticQuery(graphql`
    {
      allTip {
        edges {
          node {
            label: Title
          }
        }
      }
      allRecipe {
        edges {
          node {
            label: name
          }
        }
      }
    }
  `)

  useEffect(() => {
    getAutoCompleteList()
  }, [])

  const getAutoCompleteList = () => {
    const tips = query.allTip.edges.map(egde => ({
      category: "Tips",
      label: egde.node.label,
    }))

    const recipes = query.allRecipe.edges.map(egde => ({
      category: "Recipes",
      label: egde.node.label,
    }))
    console.log(tips)
    console.log(recipes)
    console.log([...tips, ...recipes])
    setSuggestions([...tips, ...recipes])
    return [...tips, ...recipes]
  }

  const renderSuggestion = suggestion => (
    <Link to={`${suggestion.category}/${suggestion.label}`}>
      {suggestion.label}
    </Link>
  )

  const onChange = (event, { newValue }) => {
    console.log(newValue);
    
    setValue(newValue)
  }

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? []
      : suggestions.filter(
          suggestion =>
            suggestion.label.toLowerCase().slice(0, inputLength) === inputValue
        )
  }

  const inputProps = {
    placeholder: "Szukasz profesjonalnej porady czy przepisu?",
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
