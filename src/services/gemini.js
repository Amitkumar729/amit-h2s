
import { validateImage } from './security';

/**
 * Analyzes an image by sending it to the backend API
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} Monster data generated from the image
 * @throws {Error} If validation fails or API request fails
 */
export const analyzeImage = async (imageFile) => {
  // Client-side validation
  validateImage(imageFile);

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
