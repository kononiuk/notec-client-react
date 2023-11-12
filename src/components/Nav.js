// src/ApiRequest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Nav() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3030/categories')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories: ', error);
      });
  }, []);

  return (
    <nav className="ml-auto">
      {loading ? (
        <ul><li></li></ul>
      ) : (
        <ul className="flex items-center h-full gap-2">
          {categories.map((category) => (
            <li key={category.categoryId}><Link to={'category/' + category.url}>{category.name}</Link></li>
          ))}
        </ul>
      )}
      </nav>
  );
}

export default Nav;
