// src/ApiRequest.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Nav() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_ADDRESS + 'categories')
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
            <li key={category.categoryId}>
              <NavLink 
                to={`/category/${category.url}`}>
                  {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      </nav>
  );
}

export default Nav;
