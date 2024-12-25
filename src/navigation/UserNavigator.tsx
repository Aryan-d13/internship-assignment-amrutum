import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RoutineOverview from '../screens/user/RoutineOverview';
import RoutineDetail from '../screens/user/RoutineDetail';
import UserProgress from '../screens/user/UserProgress';

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RoutineOverview"
        component={RoutineOverview}
        options={{ title: 'Routines' }}
      />
      <Stack.Screen
        name="RoutineDetail"
        component={RoutineDetail}
        options={{ title: 'Routine Details' }}
      />
      <Stack.Screen
        name="UserProgress"
        component={UserProgress}
        options={{ title: 'My Progress' }}
      />
    </Stack.Navigator>
  );
}
