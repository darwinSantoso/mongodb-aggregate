import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [productsIsLoading, setProductsIsLoading] = useState(true);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/products',
    })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => setProductsIsLoading(false));
  }, []);

  const handleCategoryFilter = (e) => {
    const value = e.target.value;
    // let url;
    // if (value){
    //   url = 'http://localhost:3001/products?category'
    // }
  };

  if (productsIsLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container">
      <div className="options">
        <form action=""></form>

        <h5>Filter Category</h5>
        <select name="category" id="category" onChange={handleCategoryFilter}>
          <option value="">All</option>
          <option value="1">Fruits</option>
          <option value="2">Vegetables</option>
        </select>
      </div>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category[0].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
