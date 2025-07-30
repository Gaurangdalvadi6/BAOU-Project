# Car Rental Frontend

A modern React frontend for the Car Rental application that integrates with a Spring Boot backend.

## Features

### Customer Features
- **User Authentication**: Register and login with JWT token support
- **Car Browsing**: View all available cars with search and filter functionality
- **Car Details**: Detailed view of individual cars with specifications
- **Booking System**: Book cars with date selection and price calculation
- **Booking History**: View all past and current bookings with status tracking

### Admin Features
- **Admin Dashboard**: Comprehensive dashboard with statistics
- **Car Management**: Add, edit, and delete cars from the inventory
- **Booking Management**: Approve or reject customer bookings
- **Booking Overview**: View all bookings in a table format

### Technical Features
- **Responsive Design**: Mobile-friendly interface
- **Modern UI**: Clean and intuitive user interface
- **Real-time Updates**: Dynamic content updates
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Smooth loading animations

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Running Spring Boot backend on `http://localhost:8080`

## Installation

1. Navigate to the frontend directory:
   ```bash
   cd car-rental-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install additional required packages:
   ```bash
   npm install axios react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   └── Navbar.css
├── context/            # React context
│   └── AuthContext.js  # Authentication context
├── pages/              # Page components
│   ├── Home.js         # Landing page
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   ├── CarList.js      # Car listing page
│   ├── CarDetail.js    # Car detail page
│   ├── BookingHistory.js # Booking history page
│   ├── AdminDashboard.js # Admin dashboard
│   └── *.css           # Page-specific styles
├── services/           # API services
│   └── api.js          # API configuration and endpoints
├── utils/              # Utility functions
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # Entry point
```

## API Integration

The frontend integrates with the following backend endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

### Customer Endpoints
- `GET /api/customer/cars` - Get all cars
- `GET /api/customer/car/{id}` - Get car by ID
- `POST /api/customer/car/book` - Book a car
- `GET /api/customer/car/bookings/{userId}` - Get user bookings
- `POST /api/customer/car/search` - Search cars

### Admin Endpoints
- `GET /api/admin/cars` - Get all cars (admin)
- `POST /api/admin/car` - Add new car
- `PUT /api/admin/car/{id}` - Update car
- `DELETE /api/admin/car/{id}` - Delete car
- `GET /api/admin/car/bookings` - Get all bookings
- `GET /api/admin/car/booking/{bookingId}/{status}` - Change booking status

## Configuration

The API base URL is configured in `src/services/api.js`. Make sure your Spring Boot backend is running on the correct port.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Browser Support

The application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
