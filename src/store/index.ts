// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import routineReducer from './routineSlice';
import userRoutineReducer from './userRoutineSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    routines: routineReducer,
    userRoutines: userRoutineReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
