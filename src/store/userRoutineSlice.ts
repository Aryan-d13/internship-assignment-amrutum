import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserRoutine = {
  userId: string;
  routineId: string;
  completedWeeks: number;
  lastUpdated: string;
};

type UserRoutineState = {
  progress: UserRoutine[];
};

const initialState: UserRoutineState = {
  progress: [],
};

const userRoutineSlice = createSlice({
  name: 'userRoutines',
  initialState,
  reducers: {
    startRoutineForUser: (
      state,
      action: PayloadAction<{
        userId: string;
        routineId: string;
        completedWeeks: number;
        lastUpdated: string;
      }>
    ) => {
      const existingRoutine = state.progress.find(
        (p) => p.userId === action.payload.userId && p.routineId === action.payload.routineId
      );

      if (!existingRoutine) {
        state.progress.push(action.payload);
      } else {
        console.warn('Routine already started:', action.payload.routineId);
      }
    },
    updateProgressForUser: (
      state,
      action: PayloadAction<{
        userId: string;
        routineId: string;
        changes: { completedWeeks: number; lastUpdated: string };
      }>
    ) => {
      const routineIndex = state.progress.findIndex(
        (p) => p.userId === action.payload.userId && p.routineId === action.payload.routineId
      );

      if (routineIndex !== -1) {
        state.progress[routineIndex] = {
          ...state.progress[routineIndex],
          ...action.payload.changes,
        };
      }
    },
  },
});

export const { startRoutineForUser, updateProgressForUser } = userRoutineSlice.actions;
export default userRoutineSlice.reducer;
