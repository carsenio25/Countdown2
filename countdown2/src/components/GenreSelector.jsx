import React from 'react';

function GenreSelector({ bookData, handleGenreChange }) {
  return (
    <div>
      {Object.keys(bookData).map(genre => (
        <button key={genre} onClick={() => handleGenreChange(genre)}>
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreSelector;