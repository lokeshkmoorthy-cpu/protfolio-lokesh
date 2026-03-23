import React, { useEffect, useRef, useState } from 'react';
import Isotope from 'isotope-layout';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

interface PortfolioItem {
  id: number;
  category: string;
  title: string;
  img: string;
}

const Portfolio = ({ data }: { data: PortfolioItem[] }) => {
  const isotopeRef = useRef<Isotope | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [filterKey, setFilterKey] = useState('*');

  useEffect(() => {
    GLightbox({ selector: '.glightbox' });

    if (containerRef.current) {
      isotopeRef.current = new Isotope(containerRef.current, {
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
      });
    }

    return () => isotopeRef.current?.destroy();
  }, []);

  useEffect(() => {
    isotopeRef.current?.arrange({ filter: filterKey });
  }, [filterKey]);

  const handleFilterKeyChange = (key: string) => () => setFilterKey(key);

  return (
    <section id="portfolio" className="portfolio section">
      <div className="container section-title">
        <h2>Portfolio</h2>
      </div>

      <div className="container">

        {/* FILTERS */}
        <ul className="portfolio-filters">
          <li onClick={handleFilterKeyChange('*')} className={filterKey === '*' ? 'filter-active' : ''}>All</li>
          <li onClick={handleFilterKeyChange('.filter-app')} className={filterKey === '.filter-app' ? 'filter-active' : ''}>App</li>
          <li onClick={handleFilterKeyChange('.filter-product')} className={filterKey === '.filter-product' ? 'filter-active' : ''}>Product</li>
        </ul>

        {/* ITEMS */}
        <div className="row gy-4" ref={containerRef}>
          {data.map((item) => (
            <div
              key={item.id}
              className={`col-lg-4 col-md-6 portfolio-item ${item.category}`}
            >
              <img
                src={`/assets/${item.img}`}
                className="img-fluid"
                alt={item.title}
              />

              <div className="portfolio-info">
                <h4>{item.title}</h4>

                <a href={`/assets/${item.img}`} className="glightbox">
                  <i className="bi bi-zoom-in"></i>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Portfolio;