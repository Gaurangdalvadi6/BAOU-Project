import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { customerAPI } from '../services/api';
import './BookingHistory.css';

const BookingHistory = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await customerAPI.getBookings(user.id);
      setBookings(response.data);
    } catch (err) {
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'status-pending';
      case 'APPROVED':
        return 'status-approved';
      case 'REJECTED':
        return 'status-rejected';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="booking-history-container">
        <div className="loading">Loading your bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-history-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="booking-history-container">
      <div className="booking-history-header">
        <h1>My Bookings</h1>
        <p>Track all your car rental bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="no-bookings">
          <div className="no-bookings-icon">📋</div>
          <h3>No bookings yet</h3>
          <p>You haven't made any bookings yet. Start by browsing our available cars!</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card">
              <div className="booking-header">
                <h3>Booking #{booking.id}</h3>
                <span className={`status ${getStatusColor(booking.bookCarStatus)}`}>
                  {booking.bookCarStatus}
                </span>
              </div>
              
              <div className="booking-details">
                <div className="detail-item">
                  <span className="detail-label">Car:</span>
                  <span className="detail-value">{booking.carName || 'Car details not available'}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">From:</span>
                  <span className="detail-value">{formatDate(booking.fromDate)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">To:</span>
                  <span className="detail-value">{formatDate(booking.toDate)}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Days:</span>
                  <span className="detail-value">{booking.days}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">Total Price:</span>
                  <span className="detail-value price">${booking.price}</span>
                </div>
              </div>
              
              <div className="booking-footer">
                <span className="booking-date">
                  Booked on: {formatDate(booking.createdAt || new Date())}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingHistory;