import React, { Component } from 'react';

const Search = (props) => {
  return (
    <div>
      <form>
        <label htmlFor="songTitle"> Song Title:
          <input 
            type="text"
            onChange={ (e) => props.recordSearch(e.target.value)}/>
        </label>
      </form>
      <button
        className='search'
        onClick={props.handleSearchClick}> Search
      </button>
    </div>
  )
}

export default Search;