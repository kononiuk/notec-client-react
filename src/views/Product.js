import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import LoaderSpin from '../components/LoaderSpin';

function Product() {
  const url = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function notFoundRedirect () {
      navigate('/no-page');
    }

    async function getProductData() {
      axios.get(process.env.REACT_APP_API_ADDRESS + 'products', { params: url})
        .then((response) => {
          if (!response.data.length) {
            return notFoundRedirect();
          }
          
          document.title = `${response.data[0].name}`;
          setProduct(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching category: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getProductData()
  }, [url, navigate]);

  return (
    <div>
      {loading ? (
        <LoaderSpin />
      ) : (
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-semibold mt-10 mb-6 text-center">{ product.name }</h2>
          <span className="text-m italic mb-4">SKU: { product.sku }</span>
          <span className="text-xl text-semibold mb-4">
          {product.inStock ? (
            <span className="text-green-600">In stock</span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
          </span>
          <span className="text-2xl text-bold mb-4">{ product.displayPrice }</span>
          <div className="actions">
            {product.inStock ? (
              <button className="mx-auto text-center bg-zinc-700 hover:bg-zinc-500 text-white font-bold py-2 px-4 rounded"><span>Add to cart</span></button>
            ) : (
              <span className="font-bold block py-2 px-4">Out of stock</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Product;