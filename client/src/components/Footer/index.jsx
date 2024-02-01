import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-3 p-2">
      <div className="container text-center mb-0">
        {location.pathname !== '/' && (
          <button
            className="btn btn-dark mb-3"
            onClick={() => navigate(-1)}
          >
            &larr; Go Back
          </button>
        )}
        <h4>Made using MERN Stack technologies by Ajay Shan ⚙️</h4>
      </div>
    </footer>
  );
};

export default Footer;
