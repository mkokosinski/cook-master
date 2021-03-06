import React, { useState, useEffect, useRef } from "react"
import Autosuggest from "react-autosuggest"
import Magnifier from "../../images/magnifier.svg"
import "./SearchInput.scss"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"

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
      category: "Porady",
      label: egde.node.label,
    }))

    const recipes = query.allRecipe.edges.map(egde => ({
      category: "Przepisy",
      label: egde.node.label,
    }))
    setSuggestions([...tips, ...recipes])
    return [...tips, ...recipes]
  }

  const renderSuggestion = suggestion => (
    <Link to={`/${suggestion.category}/${suggestion.label}`}>
      {suggestion.label}
    </Link>
  )

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  }

  const handleSubmit = () => {
    if (!value || value.trim().length === 0) {
      return
    }
    const selected = suggestions.find(suggestion => suggestion.label === value)

    if (selected) {
      navigate(`/${selected.category}/${selected.label}`)
    }
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
    onChange,
  }

  const onSuggestionsFetchRequested = ({ value }) => {
    setPrp(getSuggestions(value))
  }

  const onSuggestionsClearRequested = () => {
    setPrp([])
  }

  useEffect(() => {
    window.addEventListener("resize", onWindowResize)
    adjustPlaceholderToWidth()
    getAutoCompleteList()

    return () => {
      window.removeEventListener("resize", onWindowResize)
    }
  }, [])

  return (
    <div className="search-input" ref={searchInputRef}>
      <Autosuggest
        suggestions={prp}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        onSuggestionSelected={handleSubmit}
        inputProps={inputProps}
        alwaysRenderSuggestions={true}
      />

      <div className="magnifier" onClick={handleSubmit} role="none">
        <Magnifier />
      </div>
    </div>
  )
}

export default SearchInput
