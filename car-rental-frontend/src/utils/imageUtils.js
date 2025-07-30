/**
 * Get the full image URL from image path
 * @param {string} imagePath - Image path from backend
 * @returns {string} Full image URL
 */
export const getImageUrl = (imagePath) => {
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

/**
 * Create a data URL for an image from byte array (for backward compatibility)
 * @param {Array} byteArray - Array of bytes
 * @param {string} mimeType - MIME type (default: 'image/jpeg')
 * @returns {string} Data URL
 */
export const createImageDataUrl = (byteArray, mimeType = 'image/jpeg') => {
  if (!byteArray || !Array.isArray(byteArray)) {
    return '/placeholder-car.jpg';
  }
  
  // Convert byte array to Uint8Array
  const uint8Array = new Uint8Array(byteArray);
  
  // Convert to base64 using browser's built-in btoa function
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  
  const base64 = btoa(binary);
  if (!base64) {
    return '/placeholder-car.jpg';
  }
  return `data:${mimeType};base64,${base64}`;
}; 