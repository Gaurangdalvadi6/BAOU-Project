import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';
import AddCarModal from '../components/AddCarModal';
import EditCarModal from '../components/EditCarModal';
import { createImageDataUrl } from '../utils/imageUtils';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('cars');
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [isEditCarModalOpen, setIsEditCarModalOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);

  useEffect(() => {
    if (user && user.userRole === 'ADMIN') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [carsResponse, bookingsResponse] = await Promise.all([
        adminAPI.getAllCars(),
        adminAPI.getBookings()
      ]);
      setCars(carsResponse.data);
      setBookings(bookingsResponse.data);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingStatusChange = async (bookingId, newStatus) => {
    try {
      await adminAPI.changeBookingStatus(bookingId, newStatus);
      // Refresh bookings after status change
      const response = await adminAPI.getBookings();
      setBookings(response.data);
    } catch (err) {
      setError('Failed to update booking status. Please try again.');
    }
  };

  const handleDeleteCar = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await adminAPI.deleteCar(carId);
        setCars(cars.filter(car => car.id !== carId));
      } catch (err) {
        setError('Failed to delete car. Please try again.');
      }
    }
  };

  const handleCarAdded = () => {
    // Refresh the cars list after adding a new car
    fetchData();
  };

  const handleCarUpdated = () => {
    // Refresh the cars list after updating a car
    fetchData();
  };

  const handleEditCar = (carId) => {
    setSelectedCarId(carId);
    setIsEditCarModalOpen(true);
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
      month: 'short',
      day: 'numeric'
    });
  };

  if (!user || user.userRole !== 'ADMIN') {
    return (
      <div className="admin-dashboard-container">
        <div className="error-message">Access denied. Admin privileges required.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="admin-dashboard-container">
        <div className="loading">Loading admin dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage cars and bookings</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <h3>{cars.length}</h3>
            <p>Total Cars</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{bookings.length}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{bookings.filter(b => b.bookCarStatus === 'PENDING').length}</h3>
            <p>Pending Bookings</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'cars' ? 'active' : ''}`}
          onClick={() => setActiveTab('cars')}
        >
          Manage Cars
        </button>
        <button 
          className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Manage Bookings
        </button>
      </div>

      {activeTab === 'cars' && (
        <div className="cars-management">
          <div className="section-header">
            <h2>Car Management</h2>
            <button 
              className="add-car-btn"
              onClick={() => setIsAddCarModalOpen(true)}
            >
              Add New Car
            </button>
          </div>
          
          <div className="cars-grid">
            {cars.map(car => (
              <div key={car.id} className="car-management-card">
                <div className="car-image">
                  {car.returnedImage ? (
                    <img 
                      src={createImageDataUrl(car.returnedImage)} 
                      alt={car.name}
                    />
                  ) : (
                    <div className="car-placeholder">🚗</div>
                  )}
                </div>
                
                <div className="car-info">
                  <h3>{car.name}</h3>
                  <p className="car-brand">{car.brand}</p>
                  <p className="car-price">${car.price}/day</p>
                  
                  <div className="car-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => handleEditCar(car.id)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteCar(car.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="bookings-management">
          <div className="section-header">
            <h2>Booking Management</h2>
          </div>
          
          <div className="bookings-table">
            <table>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>#{booking.id}</td>
                    <td>{booking.username || booking.email}</td>
                    <td>{booking.carName || 'N/A'}</td>
                    <td>{formatDate(booking.fromDate)}</td>
                    <td>{formatDate(booking.toDate)}</td>
                    <td>${booking.price}</td>
                    <td>
                      <span className={`status ${getStatusColor(booking.bookCarStatus)}`}>
                        {booking.bookCarStatus}
                      </span>
                    </td>
                    <td>
                      <div className="booking-actions">
                        {booking.bookCarStatus === 'PENDING' && (
                          <>
                            <button 
                              className="approve-btn"
                              onClick={() => handleBookingStatusChange(booking.id, 'APPROVED')}
                            >
                              Approve
                            </button>
                            <button 
                              className="reject-btn"
                              onClick={() => handleBookingStatusChange(booking.id, 'REJECTED')}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AddCarModal
        isOpen={isAddCarModalOpen}
        onClose={() => setIsAddCarModalOpen(false)}
        onCarAdded={handleCarAdded}
      />

      <EditCarModal
        isOpen={isEditCarModalOpen}
        onClose={() => {
          setIsEditCarModalOpen(false);
          setSelectedCarId(null);
        }}
        onCarUpdated={handleCarUpdated}
        carId={selectedCarId}
      />
    </div>
  );
};

export default AdminDashboard;