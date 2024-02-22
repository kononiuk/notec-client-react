function NotFound() {
  document.title = `404 Not Found`;

  return (
    <div className="flex flex-col items-stretch">
      <h2 className="text-4xl text-center font-semibold my-4">404</h2>
      <p className="text-bold text-xl text-center">The page you are looking for does not exist.</p>
    </div>
  );
}
export default NotFound;