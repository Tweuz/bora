import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/common';

export default function ScreenHeader({
  title,
  onBack,
  backgroundColor = '#1E3A8A',
  showMenu,
  onMenuPress,
}) {
  return (
    <SafeAreaView style={{ backgroundColor }}>
      <View
        style={[
          styles.blueHeader,
          {
            backgroundColor,
            paddingBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        ]}
      >
        {onBack && (
          <TouchableOpacity onPress={onBack} style={{ marginRight: 15 }}>
            <MaterialCommunityIcons name="arrow-left" size={28} color="#FFF" />
          </TouchableOpacity>
        )}
        {showMenu && (
          <TouchableOpacity onPress={onMenuPress} style={{ marginRight: 15 }}>
            <MaterialCommunityIcons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
        )}
        <Text style={[styles.nomeUsuarioHome, { flex: 1 }]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}
