import { useLocation, useNavigate } from 'react-router';
import { authRoutes, loginRoute, rootRoute } from '../router/lib/constants';
import { useEffect } from 'react';
import { FC } from 'react';
import useUserStore from '@/entities/User/model/user.store';
import authToken from '@/shared/localstorage/authToken';
interface IAuthProvider {
  children: React.ReactNode;
}

const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUser = useUserStore((state) => !!state.user);
  const token = authToken.get();

  useEffect(() => {
    if ((!authRoutes.includes(location.pathname) && !isUser) || !token) {
      navigate(loginRoute);
      return;
    }
    if (authRoutes.includes(location.pathname) && isUser) {
      navigate(rootRoute);
    }
  }, [location, isUser, navigate, token]);

  return <>{children}</>;
};

export default AuthProvider;
