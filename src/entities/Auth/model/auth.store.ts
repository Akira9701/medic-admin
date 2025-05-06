import { create } from 'zustand';

interface IAuthStore {
  isShowLoader: boolean;
}

const useAuthStore = create<IAuthStore>(() => ({
  isShowLoader: true,
}));

export const setIsShowLoader = (isShowLoader: boolean) => {
  console.log('here 4', isShowLoader);
  useAuthStore.setState({ isShowLoader });
};

export default useAuthStore;
