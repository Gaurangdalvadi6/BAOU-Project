import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { customerAPI } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await customerAPI.getAllCars();
      setCars(response.data);
    } catch (err) {
      setError('Failed to load cars. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = !filterBrand || car.brand.toLowerCase() === filterBrand.toLowerCase();
    const matchesType = !filterType || car.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesBrand && matchesType;
  });

  const uniqueBrands = [...new Set(cars.map(car => car.brand))];
  const uniqueTypes = [...new Set(cars.map(car => car.type))];

  if (loading) {
    return (
      <div className="car-list-container">
        <div className="car-list-header">
          <h1>Available Cars</h1>
          <p>Find the perfect car for your journey</p>
        </div>
        <div className="loading">
          <div className="loading-spinner">🔄</div>
          <p>Loading cars...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="car-list-container">
        <div className="car-list-header">
          <h1>Available Cars</h1>
          <p>Find the perfect car for your journey</p>
        </div>
        <div className="error-message">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Cars</h3>
          <p>{error}</p>
          <button 
            className="retry-btn"
            onClick={fetchCars}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="car-list-container">
      <div className="car-list-header">
        <h1>Available Cars</h1>
        <p>Find the perfect car for your journey</p>
        {cars.length > 0 && (
          <div className="cars-count">
            <span>{filteredCars.length} of {cars.length} cars available</span>
          </div>
        )}
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search cars by name, brand, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="filter-select"
          >
            <option value="">All Brands</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {cars.length === 0 ? (
        <div className="no-cars">
          <div className="no-cars-icon">🚗</div>
          <h2>No Cars Available</h2>
          <p>Sorry, there are currently no cars available for rental.</p>
          <p>Please check back later or contact our support team.</p>
        </div>
      ) : filteredCars.length === 0 ? (
        <div className="no-cars">
          <div className="no-cars-icon">🔍</div>
          <h2>No Cars Found</h2>
          <p>No cars match your current search criteria.</p>
          <p>Try adjusting your search terms or filters.</p>
          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setFilterBrand('');
              setFilterType('');
            }}
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="cars-grid">
          {filteredCars.map(car => (
            <div key={car.id} className="car-card">
                             <div className="car-image">
                 {car.imagePath ? (
                   <img 
                     src={getImageUrl(car.imagePath)} 
                     alt={car.name}
                   />
                 ) : (
                   <div className="car-placeholder">🚗</div>
                 )}
               </div>
              
              <div className="car-info">
                <h3>{car.name}</h3>
                <p className="car-brand">{car.brand}</p>
                <p className="car-description">{car.description}</p>
                
                <div className="car-details">
                  <span className="car-type">{car.type}</span>
                  <span className="car-transmission">{car.transmission}</span>
                  <span className="car-year">{new Date(car.year).getFullYear()}</span>
                </div>
                
                <div className="car-price">
                  <span className="price">${car.price}</span>
                  <span className="price-unit">/day</span>
                </div>
                
                <Link to={`/car/${car.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;