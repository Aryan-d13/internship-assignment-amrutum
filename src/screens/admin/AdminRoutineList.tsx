import React, { useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks'; // custom typed hooks
import { fetchRoutines } from '../../store/routineSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function AdminRoutineList({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.routines);

  useEffect(() => {
    dispatch(fetchRoutines()); // Fetch from mock data
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button
        title="Create New Routine"
        onPress={() => navigation.navigate('AdminRoutineForm')}
      />
      {loading && <Text>Loading routines...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>Duration: {item.duration} weeks</Text>
            <Button
              title="Edit Routine"
              onPress={() =>
                navigation.navigate('AdminRoutineForm', { routineId: item.id })
              }
            />
          </View>
        )}
      />
    </View>
  );
}
