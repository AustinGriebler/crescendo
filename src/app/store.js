import { configureStore } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
import { recipeApi } from './services/recipes';

export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(recipeApi.middleware),
});

// export const useAppDispatch = () => useDispatch();

