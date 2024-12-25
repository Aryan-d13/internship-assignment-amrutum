// Updated userRoutineSlice.ts with Firebase Firestore integration
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUserRoutines,
  createUserRoutineProgress,
  updateUserRoutineProgress,
  UserRoutineProgress,
} from '../services/api';

interface UserRoutineState {
  progress: UserRoutineProgress[];
  loading: boolean;
  error: string | null;
}

const initialState: UserRoutineState = {
  progress: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchUserProgress = createAsyncThunk(
  'userRoutines/fetchUserProgress',
  async (userId: string) => {
    const data = await fetchUserRoutines(userId);
    return data;
  }
);

export const startRoutineForUser = createAsyncThunk(
  'userRoutines/startRoutine',
  async (progress: UserRoutineProgress, { dispatch }) => {
    const data = await createUserRoutineProgress(progress);
    await dispatch(fetchUserProgress(progress.userId));
    return data;
  }
);

export const updateProgressForUser = createAsyncThunk(
  'userRoutines/updateRoutineProgress',
  async (
    {
      userId,
      routineId,
      changes,
    }: {
      userId: string;
      routineId: string;
      changes: Partial<UserRoutineProgress>;
    },
    { dispatch }
  ) => {
    const data = await updateUserRoutineProgress(userId, routineId, changes);
    await dispatch(fetchUserProgress(userId));
    return data;
  }
);

const userRoutineSlice = createSlice({
  name: 'userRoutines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUserProgress.fulfilled,
        (state, action: PayloadAction<UserRoutineProgress[]>) => {
          state.progress = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching user routines';
      })
      .addCase(startRoutineForUser.fulfilled, (state, action: PayloadAction<UserRoutineProgress>) => {
        state.progress.push(action.payload);
      })
      .addCase(updateProgressForUser.fulfilled, (state, action) => {
        if (!action.payload) return;
        const updated = action.payload;
        const index = state.progress.findIndex(
          (p) => p.userId === updated.userId && p.routineId === updated.routineId
        );
        if (index !== -1) {
          state.progress[index] = updated;
        }
      });
  },
});

export default userRoutineSlice.reducer;
