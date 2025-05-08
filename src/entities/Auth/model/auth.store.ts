import { create } from 'zustand';

interface IAuthStore {
  isShowLoader: boolean;
}

const useAuthStore = create<IAuthStore>(() => ({
  isShowLoader: true,
}));

export const setIsShowLoader = (isShowLoader: boolean) => {
  useAuthStore.setState({ isShowLoader });
};

export default useAuthStore;
