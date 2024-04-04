import { create } from 'zustand';

const useRouteStore = create(() => ({
  prevRoute: '',
}));

export default useRouteStore;
