import authToken from '@/shared/localstorage/authToken';
import { decodeToken, isTokenExpired, getUserTypeFromToken } from '../utils/jwt.utils';
import { IClinic } from '@/entities/Clinic/types';
import { IVet } from '@/entities/Vets/types';
import authApi from '@/shared/api/auth.api';
import { toast } from 'sonner';

/**
 * Service for handling authentication-related operations
 */
export const AuthService = {
  /**
   * Get the current token from storage
   */
  getToken: (): string | null => {
    return authToken.get();
  },

  /**
   * Check if the user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = authToken.get();
    if (!token) return false;

    return !isTokenExpired(token);
  },

  /**
   * Get the current user data from token
   */
  getCurrentUser: (): IClinic | IVet | null => {
    const token = authToken.get();
    if (!token) return null;

    const decoded = decodeToken(token);
    if (!decoded) return null;

    return decoded as unknown as IClinic | IVet;
  },

  /**
   * Get user type (clinic or vet)
   */
  getUserType: (): 'clinic' | 'vet' | null => {
    const token = authToken.get();
    if (!token) return null;

    return getUserTypeFromToken(token);
  },

  /**
   * Logout the user
   */
  logout: (): void => {
    authToken.remove();
    window.location.href = '/login';
  },

  /**
   * Check and refresh token if needed (for future implementation)
   */
  refreshTokenIfNeeded: async (): Promise<boolean> => {
    const token = authToken.get();
    if (!token) return false;

    if (isTokenExpired(token)) {
      try {
        // For now, we'll just use the mock again
        // In a real implementation, you would call a refresh token API
        const response = await authApi.login('refresh@example.com', 'refresh');
        authToken.set(response.token);
        return true;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        toast.error('Срок действия вашей сессии истек. Пожалуйста, войдите снова.');
        AuthService.logout();
        return false;
      }
    }

    return true;
  },
};

export default AuthService;
