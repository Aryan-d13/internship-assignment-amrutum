// Enhanced RoutineDetail.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { startRoutineForUser } from '../../store/userRoutineSlice';

type Props = NativeStackScreenProps<any>;

export default function RoutineDetail({ route, navigation }: Props) {
  const { routineId } = route.params;
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.routines);
  const { progress } = useAppSelector((state) => state.userRoutines);

  const routine = items?.find((r) => r.id === routineId);
  const userProgress = progress?.find((p) => p.routineId === routineId);

  if (!routine) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Routine not found</Text>
      </View>
    );
  }

  const handleStartRoutine = () => {
    if (userProgress) {
      Alert.alert('Routine Already Started', 'You can continue your routine.');
      navigation.navigate('UserProgress', { routineId: routine.id });
    } else {
      dispatch(
        startRoutineForUser({
          userId: 'user123',
          routineId: routine.id,
          completedWeeks: 0,
          lastUpdated: new Date().toISOString(),
        })
      );
      Alert.alert('Success', 'Routine Started Successfully!');
      navigation.navigate('UserProgress', { routineId: routine.id });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.title}</Text>
      <Text style={styles.duration}>Duration: {routine.duration} weeks</Text>
      <Text style={styles.subtitle}>Steps:</Text>
      {routine.steps.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepText}>
            Step {step.stepNumber}: {step.description}
          </Text>
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleStartRoutine}>
        <Text style={styles.buttonText}>Start Routine</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  duration: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  stepContainer: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
