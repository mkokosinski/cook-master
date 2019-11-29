import React, { useState, useEffect, useRef } from "react"
import Autosuggest from "react-autosuggest"
import magnifier from "../../images/magnifier.svg"
import "./SearchInput.scss"
import { Link, useStaticQuery, graphql } from "gatsby"

const getSuggestionValue = suggestion => suggestion.label

const SearchInput = () => {
  const [value, setValue] = useState("")
  const [prp, setPrp] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [placeholderValue, setPlaceholderValue] = useState("")

  const searchInputRef = useRef(null) 

  const query = useStaticQuery(graphql`
    {
      allTip {
        edges {
          node {
            label: name
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
    window.addEventListener("resize", onWindowResize);
    adjustPlaceholderToWidth();
    getAutoCompleteList()

    return () =>{
      window.removeEventListener("resize", onWindowResize);
    }
  }, [])

  let innerHeight = 0;
  const onWindowResize = e => {
    adjustPlaceholderToWidth()
  }

  const adjustPlaceholderToWidth = () => {
    const docWidth = document.documentElement.clientWidth
    if (docWidth < 380) {
      setPlaceholderValue("Czego szukasz?")
    } else {
      setPlaceholderValue("Szukasz profesjonalnej porady czy przepisu?")
    }
  }

  const getAutoCompleteList = () => {
    const tips = query.allTip.edges.map(egde => ({
      category: "Tips",
      label: egde.node.label,
    }))

    const recipes = query.allRecipe.edges.map(egde => ({
      category: "Recipes",
      label: egde.node.label,
    }))
    setSuggestions([...tips, ...recipes])
    return [...tips, ...recipes]
  }

  const renderSuggestion = suggestion => (
    <Link to={`${suggestion.category}/${suggestion.label}`}>
      {suggestion.label}
    </Link>
  )

  const onChange = (event, { newValue }) => {
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
    placeholder: placeholderValue,
    value,
    onChange
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setPrp(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setPrp([])
  }

  return (
    <div className="search-input" ref={searchInputRef}>
      <Autosuggest
        suggestions={prp}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        
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
