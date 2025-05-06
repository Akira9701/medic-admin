const createStorageItem = <T>(key: string) => {
  return {
    get(): T | null {
      let item = null;
      const value = localStorage.getItem(key);
      if (value !== null) {
        try {
          item = JSON.parse(value);
        } catch (e) {
          console.error(e);
          item = value;
        }
      }
      return item;
    },
    set(data: T) {
      return localStorage.setItem(key, JSON.stringify(data));
    },

    update(data: Record<string, string | number | boolean>) {
      const prevData = this.get();
      if (prevData) return localStorage.setItem(key, JSON.stringify({ ...prevData, ...data }));
      return localStorage.setItem(key, JSON.stringify({ data }));
    },
    remove() {
      return localStorage.removeItem(key);
    },
  };
};

export default createStorageItem;
