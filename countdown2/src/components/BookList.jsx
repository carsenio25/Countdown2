import React from 'react';

function BookList({ bookData, addToBasket }) {
  return (
    <ul>
      {bookData.map(book => (
        <li key={book.title}>
          {book.title} by {book.author} - ${book.price}
          <button onClick={() => addToBasket(book)}>Add to Basket</button>
        </li>
      ))}
    </ul>
  );
}

export default BookList;