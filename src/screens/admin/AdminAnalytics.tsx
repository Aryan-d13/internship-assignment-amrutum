// Enhanced AdminAnalytics.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function AdminAnalytics() {
  const [stats, setStats] = useState<any>({ totalRoutines: 0, totalCompletions: 0 });

  useEffect(() => {
    axios
      .get('http://localhost:4000/analytics')
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Total Routines:</Text>
        <Text style={styles.statValue}>{stats.totalRoutines}</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Total Completions:</Text>
        <Text style={styles.statValue}>{stats.totalCompletions}</Text>
      </View>
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
    marginBottom: 16,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
