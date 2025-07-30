// Debug script to check API response
const axios = require('axios');

async function testAPI() {
    try {
        // First, let's try to get a JWT token
        const loginResponse = await axios.post('http://localhost:8080/api/auth/signup', {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123',
            userRole: 'CUSTOMER'
        });
        
        console.log('Signup response:', loginResponse.data);
        
        // Now try to login
        const authResponse = await axios.post('http://localhost:8080/api/auth/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        
        console.log('Login response:', authResponse.data);
        
        const token = authResponse.data.jwt;
        
        // Now try to get cars with the token
        const carsResponse = await axios.get('http://localhost:8080/api/customer/cars', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        console.log('Cars response:', JSON.stringify(carsResponse.data, null, 2));
        
        // Check if cars have imagePath
        if (carsResponse.data && carsResponse.data.length > 0) {
            console.log('\nCar data structure:');
            carsResponse.data.forEach((car, index) => {
                console.log(`Car ${index + 1}:`);
                console.log(`  - ID: ${car.id}`);
                console.log(`  - Name: ${car.name}`);
                console.log(`  - Image Path: ${car.imagePath}`);
                console.log(`  - Has imagePath: ${!!car.imagePath}`);
            });
        }
        
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

testAPI(); 