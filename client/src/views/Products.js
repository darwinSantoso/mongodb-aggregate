import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState([]);
  const [productsIsLoading, setProductsIsLoading] = useState(true);
  const [summaryIsLoading, setSummaryIsLoading] = useState(true);

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

    axios({
      method: 'GET',
      url: 'http://localhost:3001/products/summary',
    })
      .then((response) => {
        setSummary(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      })
      .finally(() => setSummaryIsLoading(false));
  }, []);

  const handleCategoryFilter = (e) => {
    const value = e.target.value;
    let url, summaryUrl;
    if (value) {
      url = `http://localhost:3001/products?categoryId=${value}`;
      summaryUrl = `http://localhost:3001/products/summary?categoryId=${value}`;
    } else if (!value) {
      url = 'http://localhost:3001/products';
      summaryUrl = 'http://localhost:3001/products/summary';
    }

    setProductsIsLoading(true);

    axios({
      url,
      method: 'GET',
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setProductsIsLoading(false);
      });

    axios({
      url: summaryUrl,
      method: 'GET',
    })
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSummaryIsLoading(false);
      });
  };

  if (productsIsLoading) {
    return <h2>Loading...</h2>;
  }

  if (summaryIsLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="container">
        <div className="options">
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
        <br />

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Total Stock</th>
              <th scope="col">Average Stock</th>
            </tr>
          </thead>
          <tbody>
            <td>{summary[0].totalStock}</td>
            <td>{Math.round(summary[0].averageStock * 100) / 100}</td>
          </tbody>
        </table>
      </div>
    </>
  );
}
