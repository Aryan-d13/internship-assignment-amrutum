// Updated routineSlice.ts to handle duplicate issue by ensuring consistent state management
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchAllRoutines,
  createRoutine,
  updateRoutine,
  Routine,
} from '../services/api';

interface RoutineState {
  items: Routine[];
  loading: boolean;
  error: string | null;
}

const initialState: RoutineState = {
  items: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchRoutines = createAsyncThunk('routines/fetchAll', async () => {
  const data = await fetchAllRoutines();
  return data;
});

export const createNewRoutine = createAsyncThunk(
  'routines/createNew',
  async (routine: Routine) => {
    const data = await createRoutine(routine);
    return data;
  }
);

export const updateExistingRoutine = createAsyncThunk(
  'routines/updateExisting',
  async ({ id, updates }: { id: string; updates: Partial<Routine> }) => {
    const data = await updateRoutine(id, updates);
    return data;
  }
);

const routineSlice = createSlice({
  name: 'routines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutines.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoutines.fulfilled, (state, action: PayloadAction<Routine[]>) => {
        state.items = action.payload; // Replace items, don't append
        state.loading = false;
      })
      .addCase(fetchRoutines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching routines';
      })
      .addCase(createNewRoutine.fulfilled, (state, action: PayloadAction<Routine>) => {
        state.items.push(action.payload); // Only add new routine locally
      })
      .addCase(updateExistingRoutine.fulfilled, (state, action) => {
        if (!action.payload) return;
        const updatedRoutine = action.payload;
        const index = state.items.findIndex((r) => r.id === updatedRoutine.id);
        if (index !== -1) {
          state.items[index] = updatedRoutine;
        }
      });
  },
});

export default routineSlice.reducer;
