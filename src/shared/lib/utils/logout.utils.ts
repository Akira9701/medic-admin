import { setUser } from '@/entities/User/model/user.store';
import authToken from '@/shared/localstorage/authToken';

const logoutHandler = () => {
  authToken.remove();
  window.location.href = '/login';
  setUser(null);
};

export default logoutHandler;
