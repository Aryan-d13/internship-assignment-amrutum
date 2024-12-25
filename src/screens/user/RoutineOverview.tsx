// Updated RoutineOverview.tsx to use unique Firestore IDs and avoid duplicate entries
import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchRoutines } from '../../store/routineSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

export default function RoutineOverview({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.routines);

  useEffect(() => {
    dispatch(fetchRoutines()); // Load routines from Firestore
  }, [dispatch]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>All Available Routines</Text>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id} // Ensure unique key using Firestore document ID
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginVertical: 10 }}
            onPress={() => navigation.navigate('RoutineDetail', { routineId: item.id })}
          >
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>Duration: {item.duration} weeks</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
