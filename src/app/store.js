import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import tvReducer from '../features/tv/tvSlice';
import movieReducer from '../features/movie/movieSlice';
import commonReducer from '../features/common/commonSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tv : tvReducer,
    movie : movieReducer,
    common : commonReducer
  },
});
