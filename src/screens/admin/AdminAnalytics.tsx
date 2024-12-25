import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

export default function AdminAnalytics() {
  const [stats, setStats] = useState<any>({ totalRoutines: 0, totalCompletions: 0 });

  useEffect(() => {
    // Suppose your backend has /analytics endpoint returning something like { totalRoutines, totalCompletions }
    axios.get('http://localhost:4000/analytics')
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Number of Routines: {stats.totalRoutines}</Text>
      <Text>Number of Completions: {stats.totalCompletions}</Text>
    </View>
  );
}
