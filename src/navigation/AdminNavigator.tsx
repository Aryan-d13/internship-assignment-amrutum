import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminRoutineList from '../screens/admin/AdminRoutineList';
import AdminRoutineForm from '../screens/admin/AdminRoutineForm';
import AdminAnalytics from '../screens/admin/AdminAnalytics';

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminRoutineList"
        component={AdminRoutineList}
        options={{ title: 'Manage Routines' }}
      />
      <Stack.Screen
        name="AdminRoutineForm"
        component={AdminRoutineForm}
        options={{ title: 'Routine Form' }}
      />
      <Stack.Screen
        name="AdminAnalytics"
        component={AdminAnalytics}
        options={{ title: 'Analytics' }}
      />
    </Stack.Navigator>
  );
}
