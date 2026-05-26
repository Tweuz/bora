import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

export default function LoadingOverlay({ message = 'Carregando...' }) {
  return (
    <View style={localStyles.container}>
      <ActivityIndicator size="large" color="#1E3A8A" />
      <Text style={localStyles.text}>{message}</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  text: { marginTop: 12, fontSize: 15, color: '#64748B' },
});
