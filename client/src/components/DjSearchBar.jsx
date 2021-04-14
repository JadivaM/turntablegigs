import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';

const DjSearchBar = ({ setSearchResults }) => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="containerSearch">
      <div className="dj-searchbar">
        <form onSubmit={handleSubmit}>
          <SearchIcon className="dj-searchbar-search-icon" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            id="dj-search-input"
            type="text"
            label="search"
            placeholder="Search by location, name, or genre"
          />
        </form>
      </div>
    </div>
  );
};

export default DjSearchBar;
