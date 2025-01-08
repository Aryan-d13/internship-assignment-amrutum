// Enhanced AdminRoutineForm.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createNewRoutine, updateExistingRoutine } from '../../store/routineSlice';
import { Routine } from '../../services/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function AdminRoutineForm({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.routines);

  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState<number>(8);
  const [milestones, setMilestones] = useState<string[]>(['Week 1: ...', 'Week 2: ...']);
  const [steps, setSteps] = useState([{ stepNumber: 1, description: '' }]);

  const routineId = route.params?.routineId;

  useEffect(() => {
    if (routineId) {
      const existing = items.find((r) => r.id === routineId);
      if (existing) {
        setTitle(existing.title);
        setDuration(existing.duration);
        setMilestones(existing.milestones);
        setSteps(existing.steps);
      }
    }
  }, [routineId, items]);

  const handleSave = async () => {
    if (routineId) {
      await dispatch(
        updateExistingRoutine({
          id: routineId,
          updates: { title, duration, milestones, steps },
        })
      );
    } else {
      const newRoutine: Routine = {
        id: Date.now().toString(),
        title,
        duration,
        milestones,
        steps,
        brandId: 'brand123',
      };
      await dispatch(createNewRoutine(newRoutine));
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Routine Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter routine title"
      />

      <Text style={styles.label}>Duration (weeks)</Text>
      <TextInput
        value={duration.toString()}
        onChangeText={(val) => setDuration(parseInt(val, 10) || 8)}
        keyboardType="numeric"
        style={styles.input}
        placeholder="Enter duration in weeks"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Routine</Text>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
