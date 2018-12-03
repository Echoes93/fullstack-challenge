import React from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";

import { ACTION_CREATORS } from "../../state/actions";
import "./autosuggest.css";


const getSuggestionValue = (suggestion) => suggestion.name;
const renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

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
    renderSuggestion={ renderSuggestion }
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