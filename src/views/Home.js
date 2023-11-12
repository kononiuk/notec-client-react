import ProductsList from '../components/ProductsList';

function Home() {
  document.title = `Notec`;

  return (
    <div>
      <h2 className="text-4xl text-center font-semibold my-4">All products</h2>
      <ProductsList />
    </div>
  );
}
export default Home;