import { decodeJwt } from 'jose';

/**
 * Decodes a JWT token without verifying signature
 * @param token JWT token string
 * @returns Decoded payload or null if invalid
 */
export const decodeToken = (token: string) => {
  try {
    return decodeJwt(token);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Checks if a token has expired
 * @param token JWT token string
 * @returns true if token is expired or invalid, false otherwise
 */
export const isTokenExpired = (token: string) => {
  try {
    const decoded = decodeJwt(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (!decoded.exp) return false;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Treat invalid tokens as expired
  }
};

/**
 * Gets user type from token (clinic or vet)
 * @param token JWT token string
 * @returns 'clinic' or 'vet' or null if can't determine
 */
export const getUserTypeFromToken = (token: string) => {
  try {
    const decoded = decodeJwt(token);

    // Determine user type based on payload structure
    if (decoded.vets !== undefined) {
      return 'clinic';
    } else if (decoded.specialization !== undefined) {
      return 'vet';
    }

    return null;
  } catch (error) {
    console.error('Error determining user type from token:', error);
    return null;
  }
};
