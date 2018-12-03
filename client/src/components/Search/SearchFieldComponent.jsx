import React from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";

import { ACTION_CREATORS } from "../../state/actions";
import "./autosuggest.css";


const getSuggestionValue = (suggestion) => suggestion.name;
const renderSuggestion = (query) => ({ name }) => {
  const matchIndex = name.toLowerCase().indexOf(query.toLowerCase());
  
  if (matchIndex > -1) {
    const head = name.substring(0, matchIndex);
    const matchedValue = name.substring(matchIndex, matchIndex + query.length);
    const tail = name.substring(matchIndex + query.length, name.length);
  
    return <p>{head}<b>{matchedValue}</b>{tail}</p>;
  } else {
    return <p>{name}</p>;
  }
};

const SearchFieldComponent = ({ 
                                query,
                                onSearchQueryChange,
                                suggestions,
                                onSuggestionsFetchRequested,
                                onSuggestionsClearRequested,
                                displayResults }) => 
  <Autosuggest
    suggestions={ suggestions }
    onSuggestionsFetchRequested={ onSuggestionsFetchRequested }
    onSuggestionsClearRequested={ onSuggestionsClearRequested }
    getSuggestionValue={ getSuggestionValue }
    renderSuggestion={ renderSuggestion(query) }
    onSuggestionSelected={ (_e, { suggestion }) => displayResults([suggestion]) }
    inputProps={{ 
      id: "searchField",
      className: "form-control mr-sm-2", 
      placeholder: "Search", 
      value: query, 
      onChange: (_e, { newValue }) => onSearchQueryChange(newValue),
      onKeyPress: (e) => { if (e.key === "Enter") displayResults(suggestions) } 
    }}
  />


export default connect(
  state => ({
    query: state.search.query,
    suggestions: state.search.suggestions
  }),
  dispatch => ({
    onSearchQueryChange: (newValue) => dispatch(ACTION_CREATORS.searchQueryChanged(newValue)),
    onSuggestionsFetchRequested: ({ value }) => dispatch(ACTION_CREATORS.lookupSuggestions(value)),
    onSuggestionsClearRequested: () => dispatch(ACTION_CREATORS.clearSuggestions()),
    displayResults: results => dispatch(ACTION_CREATORS.displayResults(results))
  })
)(SearchFieldComponent);