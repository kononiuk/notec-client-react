const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 p-4">
      <div className="copyright text-center"><span>&copy; Copyright { currentYear } Notec</span></div>
    </footer>
  );
};

export default Footer;