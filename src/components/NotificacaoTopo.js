import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/common';

export default function NotificacaoTopo({ visivel, setVisivel, navigation }) {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const esconder = () => {
    Animated.timing(slideAnim, {
      toValue: -120,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisivel(false));
  };

  useEffect(() => {
    if (visivel) {
      Animated.spring(slideAnim, {
        toValue: Platform.OS === 'ios' ? 50 : 20,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(esconder, 6000);
      return () => clearTimeout(timer);
    }
  }, [visivel]);

  if (!visivel) return null;

  return (
    <Animated.View style={[styles.notificacaoBox, { transform: [{ translateY: slideAnim }] }]}>
      <TouchableOpacity
        style={styles.notificacaoContent}
        onPress={() => {
          navigation.navigate('Campanhas');
          esconder();
        }}
      >
        <View style={styles.notificacaoIcon}>
          <MaterialCommunityIcons name="gift" size={20} color="#FFF" />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.notificacaoTitulo}>Ação Social</Text>
          <Text style={styles.notificacaoTexto}>Venha ajudar na nossa campanha de doação!</Text>
        </View>
        <TouchableOpacity onPress={esconder} style={{ padding: 5 }}>
          <MaterialCommunityIcons name="close" size={18} color="#94A3B8" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
