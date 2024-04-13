import React from 'react';

function Basket({ basket }) {
  return (
    <div>
      <h2>Basket</h2>
      <ul>
        {basket.map((book, index) => (
          <li key={index}>
            {book.title} - ${book.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Basket;