import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
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
  const [milestones, setMilestones] = useState<string[]>([
    'Week 1: ...',
    'Week 2: ...',
  ]);
  const [steps, setSteps] = useState([{ stepNumber: 1, description: '' }]);

  const routineId = route.params?.routineId;

  // Load existing routine if editing
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
      // Update existing
      await dispatch(
        updateExistingRoutine({
          id: routineId,
          updates: { title, duration, milestones, steps },
        })
      );
    } else {
      // Create new
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
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Routine Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      <Text>Duration (weeks)</Text>
      <TextInput
        value={duration.toString()}
        onChangeText={(val) => setDuration(parseInt(val, 10) || 8)}
        keyboardType="numeric"
        style={{ borderWidth: 1, marginBottom: 12 }}
      />

      {/* For simplicity, skipping the full UI for editing milestones and steps */}
      <Button title="Save Routine" onPress={handleSave} />
    </View>
  );
}
