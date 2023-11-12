import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoaderSpin from './LoaderSpin';

function ProductsList( productsListProp ) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Object.keys(productsListProp).length || productsListProp.products.length) {
      const reqProductsList = productsListProp && productsListProp.products ? productsListProp.products : [];

      axios.get('http://localhost:3030/products', { params: { productId: reqProductsList }})
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [productsListProp]);

  return (
    <div>
      <div className={loading ? "" : "hidden"}>
        <LoaderSpin/>
      </div>
      {(products.length) 
        ? <ul className={loading ? "hidden" : "products-list grid grid-cols-4 gap-8 max-w-7xl px-5 mx-auto"}>
            {products.map((product) => (
              <li key={product.id} className="mb-2 p-4 bg-neutral-100 rounded">
                <div className="product flex flex-col text-center">
                  <Link to={'product/' + product.url}>{product.name}</Link>
                  <div className="price">{product.displayPrice}</div>
                  <div className="actions w-full">
                    {
                      product.inStock 
                      ? <button className="mx-auto text-center bg-zinc-700 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded"><span>Add to cart</span></button> 
                      : <span className="font-bold block py-2 px-4">Out of stock</span>
                    }
                  </div>
                </div>
              </li>
            ))}
          </ul>
        : <p className={loading ? "hidden" : "text-bold text-xl text-center"}>No products were found</p>
      }
    </div>
  );
}

export default ProductsList;
