// Test script to verify image URL generation
const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return '/placeholder-car.jpg'; // Default placeholder image
  }
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative path, prepend the API base URL
  const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
  return `${baseUrl}/images/${imagePath}`;
};

// Test cases
console.log('Testing image URL generation:');
console.log('1. With imagePath:', getImageUrl('b96159bc-9d85-4207-bd3f-8db1b4fab177.jpg'));
console.log('2. Without imagePath:', getImageUrl(null));
console.log('3. With full URL:', getImageUrl('http://example.com/image.jpg'));
console.log('4. Empty string:', getImageUrl('')); 