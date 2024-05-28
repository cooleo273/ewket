import React from 'react';

const SearchResultsList = ({ results }) => {
  return (
    <div className='result-list'>
      {
        results.length > 0 ? (
          results.map((result, id) => (
            <div key={id}>{result.fullName}</div>
          ))
        ) : (
          <div></div>
        )
      }
    </div>
  );
};

export default SearchResultsList;
