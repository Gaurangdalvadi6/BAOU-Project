import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customerAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getImageUrl } from '../utils/imageUtils';
import './CarDetail.css';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState({
    fromDate: '',
    toDate: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const response = await customerAPI.getCarById(id);
      setCar(response.data);
    } catch (err) {
      setError('Failed to load car details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const calculateDays = () => {
    if (!bookingData.fromDate || !bookingData.toDate) return 0;
    const from = new Date(bookingData.fromDate);
    const to = new Date(bookingData.toDate);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotalPrice = () => {
    const days = calculateDays();
    return car ? days * car.price : 0;
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!bookingData.fromDate || !bookingData.toDate) {
      setError('Please select both from and to dates.');
      return;
    }

    if (calculateDays() <= 0) {
      setError('To date must be after from date.');
      return;
    }

    setBookingLoading(true);
    setError('');

    try {
      const bookingPayload = {
        carId: car.id,
        userId: user.id,
        fromDate: bookingData.fromDate,
        toDate: bookingData.toDate,
        days: calculateDays(),
        price: calculateTotalPrice()
      };

      await customerAPI.bookCar(bookingPayload);
      navigate('/bookings', { 
        state: { message: 'Car booked successfully!' }
      });
    } catch (err) {
      setError(err.response?.data || 'Booking failed. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="car-detail-container">
        <div className="loading">Loading car details...</div>
      </div>
    );
  }

  if (error && !car) {
    return (
      <div className="car-detail-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="car-detail-container">
        <div className="error-message">Car not found.</div>
      </div>
    );
  }

  return (
    <div className="car-detail-container">
      <div className="car-detail-content">
        <div className="car-detail-left">
                     <div className="car-image-large">
             {car.imagePath ? (
               <img 
                 src={getImageUrl(car.imagePath)} 
                 alt={car.name}
               />
             ) : (
               <div className="car-placeholder-large">🚗</div>
             )}
           </div>
          
          <div className="car-info-detailed">
            <h1>{car.name}</h1>
            <p className="car-brand">{car.brand}</p>
            <p className="car-description">{car.description}</p>
            
            <div className="car-specs">
              <div className="spec-item">
                <span className="spec-label">Type:</span>
                <span className="spec-value">{car.type}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Transmission:</span>
                <span className="spec-value">{car.transmission}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Color:</span>
                <span className="spec-value">{car.color}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Year:</span>
                <span className="spec-value">{new Date(car.year).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="car-detail-right">
          <div className="booking-card">
            <h3>Book This Car</h3>
            <div className="price-display">
              <span className="price">${car.price}</span>
              <span className="price-unit">/day</span>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleBooking} className="booking-form">
              <div className="form-group">
                <label htmlFor="fromDate">From Date</label>
                <input
                  type="date"
                  id="fromDate"
                  name="fromDate"
                  value={bookingData.fromDate}
                  onChange={handleBookingChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="toDate">To Date</label>
                <input
                  type="date"
                  id="toDate"
                  name="toDate"
                  value={bookingData.toDate}
                  onChange={handleBookingChange}
                  min={bookingData.fromDate || new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              {calculateDays() > 0 && (
                <div className="booking-summary">
                  <div className="summary-item">
                    <span>Days:</span>
                    <span>{calculateDays()}</span>
                  </div>
                  <div className="summary-item">
                    <span>Total Price:</span>
                    <span>${calculateTotalPrice()}</span>
                  </div>
                </div>
              )}
              
              <button 
                type="submit" 
                className="book-btn"
                disabled={bookingLoading || !isAuthenticated}
              >
                {bookingLoading ? 'Booking...' : isAuthenticated ? 'Book Now' : 'Login to Book'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;