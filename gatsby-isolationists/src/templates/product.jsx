import React from 'react';

export default function Product({ pageContext }) {
  const { product, path } = pageContext;
  return (
    <>
      <h1>{path}</h1>
      <div>
        Name: {product.name}
        Price: {product.price}
        Description: {product.description}
      </div>
    </>
  );
}
