import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/filtersSlice';
import heroes from '../components/heroesList/heroesSlice';

const store = configureStore({
  reducer:  {filters, heroes},
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})
export default store;