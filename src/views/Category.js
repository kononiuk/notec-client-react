import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import LoaderSpin from '../components/LoaderSpin';
import ProductsList from '../components/ProductsList';

function Category() {
  const url = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function notFoundRedirect () {
      navigate('/no-page');
    }

    async function getCategoryData() {
      await axios.get(process.env.REACT_APP_API_ADDRESS + 'categories', { params: url})
        .then((response) => {
          if (!response.data.length) {
            return notFoundRedirect();
          }
  
          document.title = `${response.data[0].name}`;
          setCategory(response.data[0]);
        })
        .catch((error) => {
          console.error('Error fetching category: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getCategoryData();
  }, [url, navigate]);

  return (
      <div className="flex flex-col items-stretch">
        {loading ? (
          <LoaderSpin />
        ) : (
          <div className="flex flex-col items-stretch">
            <h2 className="text-4xl text-center font-semibold my-4">{ category.name }</h2>
            <ProductsList products={category.products}/>
          </div>
        )}
      </div>
  );
}
export default Category;