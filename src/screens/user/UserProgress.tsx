import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateProgressForUser } from '../../store/userRoutineSlice';

type Props = NativeStackScreenProps<any>;

export default function UserProgress({ route }: Props) {
  const { routineId } = route.params;
  const dispatch = useAppDispatch();
  const userId = 'user123';

  const { progress } = useAppSelector((state) => state.userRoutines);
  const userProgress = progress.find(
    (p) => p.userId === userId && p.routineId === routineId
  );

  if (!userProgress) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>No progress found for this routine.</Text>
      </View>
    );
  }

  const handleCompleteWeek = () => {
    dispatch(
      updateProgressForUser({
        userId,
        routineId,
        changes: {
          completedWeeks: userProgress.completedWeeks + 1,
          lastUpdated: new Date().toISOString(),
        },
      })
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Routine ID: {routineId}</Text>
      <Text>Weeks Completed: {userProgress.completedWeeks}</Text>
      <Button title="Mark Next Week Complete" onPress={handleCompleteWeek} />
    </View>
  );
}
