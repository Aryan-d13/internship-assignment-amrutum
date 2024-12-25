import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { startRoutineForUser } from '../../store/userRoutineSlice';

type Props = NativeStackScreenProps<any>;

export default function RoutineDetail({ route, navigation }: Props) {
  const { routineId } = route.params;
  const { items } = useAppSelector((state) => state.routines);
  const dispatch = useAppDispatch();

  const routine = items.find((r) => r.id === routineId);
  if (!routine) {
    return <Text>Routine not found</Text>;
  }

  const handleStartRoutine = () => {
    dispatch(
      startRoutineForUser({
        userId: 'user123',
        routineId: routine.id,
        completedWeeks: 0,
        lastUpdated: new Date().toISOString(),
      })
    );
    navigation.navigate('UserProgress', { routineId: routine.id });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{routine.title}</Text>
      <Text>Duration: {routine.duration} weeks</Text>
      <Text style={{ marginTop: 16, fontWeight: 'bold' }}>Steps:</Text>
      {routine.steps.map((step) => (
        <Text key={step.stepNumber}>
          Step {step.stepNumber}: {step.description}
        </Text>
      ))}
      <Button title="Start Routine" onPress={handleStartRoutine} />
    </View>
  );
}
