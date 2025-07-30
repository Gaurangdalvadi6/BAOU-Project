import React, { useState } from 'react';
import { adminAPI } from '../services/api';
import './AddCarModal.css';

const AddCarModal = ({ isOpen, onClose, onCarAdded }) => {
  const [formData, setFormData] = useState({
    brand: '',
    color: '',
    name: '',
    type: '',
    transmission: '',
    description: '',
    price: '',
    year: ''
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add image if selected
      if (image) {
        formDataToSend.append('image', image);
      }

      await adminAPI.createCar(formDataToSend);
      
      // Reset form
      setFormData({
        brand: '',
        color: '',
        name: '',
        type: '',
        transmission: '',
        description: '',
        price: '',
        year: ''
      });
      setImage(null);
      
      onCarAdded(); // Refresh the cars list
      onClose(); // Close modal
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Car</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="add-car-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Car Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter car name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="brand">Brand *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                placeholder="Enter brand"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="type">Type *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Select type</option>
                <option value="SEDAN">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="HATCHBACK">Hatchback</option>
                <option value="CONVERTIBLE">Convertible</option>
                <option value="LUXURY">Luxury</option>
                <option value="SPORTS">Sports</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="transmission">Transmission *</label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleInputChange}
                required
              >
                <option value="">Select transmission</option>
                <option value="MANUAL">Manual</option>
                <option value="AUTOMATIC">Automatic</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="color">Color *</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                required
                placeholder="Enter color"
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                min="1900"
                max={new Date().getFullYear() + 1}
                placeholder="Enter year"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price per Day ($) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="1"
              placeholder="Enter price per day"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              placeholder="Enter car description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Car Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
            />
            <small>Accepted formats: JPG, PNG, GIF (Max size: 5MB)</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding Car...' : 'Add Car'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarModal; 