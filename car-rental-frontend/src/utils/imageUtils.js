/**
 * Convert a byte array to base64 string for browser environment
 * @param {Array} byteArray - Array of bytes
 * @returns {string} Base64 string
 */
export const bytesToBase64 = (byteArray) => {
  if (!byteArray || !Array.isArray(byteArray)) {
    return '';
  }
  
  // Convert byte array to Uint8Array
  const uint8Array = new Uint8Array(byteArray);
  
  // Convert to base64 using browser's built-in btoa function
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  
  return btoa(binary);
};

/**
 * Create a data URL for an image from byte array
 * @param {Array} byteArray - Array of bytes
 * @param {string} mimeType - MIME type (default: 'image/jpeg')
 * @returns {string} Data URL
 */
export const createImageDataUrl = (byteArray, mimeType = 'image/jpeg') => {
  const base64 = bytesToBase64(byteArray);
  if (!base64) {
    return '';
  }
  return `data:${mimeType};base64,${base64}`;
}; 