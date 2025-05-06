import createStorageItem from '../lib/utils/localStorage.utils';

const authToken = createStorageItem<string>('authToken');

export default authToken;
