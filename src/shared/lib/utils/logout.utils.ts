import { setIsShowLoader } from '@/entities/Auth/model/auth.store';
import { setUser } from '@/entities/User/model/user.store';
import authToken from '@/shared/localstorage/authToken';
import { delay } from './delay.utils';

const logoutHandler = () => {
  setIsShowLoader(true);
  delay(300).then(() => {
    authToken.remove();
    window.location.href = '/login';
    setUser(null);
  });
};

export default logoutHandler;
