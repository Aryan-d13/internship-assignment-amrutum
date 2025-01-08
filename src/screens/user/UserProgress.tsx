// UserProgress.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateProgressForUser } from '../../store/userRoutineSlice';

type Props = NativeStackScreenProps<any>;

export default function UserProgress({ route }: Props) {
  const { routineId } = route.params;
  const dispatch = useAppDispatch();
  const userId = 'user123';

  const { progress } = useAppSelector((state) => state.userRoutines);
  const { items } = useAppSelector((state) => state.routines);

  const userProgress = progress?.find(
    (p) => p.userId === userId && p.routineId === routineId
  );
  const routine = items?.find((r) => r.id === routineId);

  if (!routine || !userProgress) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No progress or routine found for this routine.</Text>
      </View>
    );
  }

  const handleCompleteWeek = () => {
    if (userProgress.completedWeeks < routine.duration) {
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
      Alert.alert('Success', 'Progress updated successfully!');
    } else {
      Alert.alert('Info', 'Routine already completed!');
    }
  };

  const progressPercentage = (userProgress.completedWeeks / routine.duration) * 100;
  const currentMilestone =
    routine.milestones?.[userProgress.completedWeeks] || 'No milestone available';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{routine.title}</Text>
      <Text style={styles.subtitle}>Routine Duration: {routine.duration} weeks</Text>
      <Text style={styles.milestone}>Current Milestone: {currentMilestone}</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>

      <Text style={styles.progressText}>
        {userProgress.completedWeeks}/{routine.duration} Weeks Completed
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleCompleteWeek}>
        <Text style={styles.buttonText}>Mark Next Week Complete</Text>
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
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  milestone: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ddd',
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
