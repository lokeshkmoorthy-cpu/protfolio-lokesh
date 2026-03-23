import React from 'react';

const Footer: React.FC = () => {
  // Logic to get the current year automatically
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="footer light-background">
      <div className="container">
        <div className="copyright text-center">
          <p>
            © <span>Copyright {currentYear}</span>{' '}
            <strong className="px-1 sitename">LOKESH K</strong>{' '}
            <span>All Rights Reserved</span>
          </p>
        </div>
        
        <div className="social-links d-flex justify-content-center">
          <a href="#" aria-label="Twitter">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="#" aria-label="Facebook">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#" aria-label="Linkedin">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>

        <div className="credits">
          {/* 
              All the links in the footer should remain intact.
              Licensing information: https://bootstrapmade.com/license/
          */}
          Designed by <a href="https://bootstrapmade.com/" target="_blank" rel="noopener noreferrer">BootstrapMade</a> Distributed by <a href="https://themewagon.com" target="_blank" rel="noopener noreferrer">ThemeWagon</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;