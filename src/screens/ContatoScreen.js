import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/common';

export default function ContatoScreen({ navigation }) {
  const abrirLigacao = () => Linking.openURL('tel:6139746600');
  const abrirWhatsApp = () => Linking.openURL('https://wa.me/6139746600');
  const abrirYouTube = () => Linking.openURL('https://www.youtube.com/paroquiamariaimaculada');
  const abrirEmail = () => Linking.openURL('mailto:paroquiaimaculadaguara@gmail.com');

  const botoes = [
    { titulo: 'Ligar para a Secretaria', sub: 'Fale diretamente conosco', icone: 'phone', cor: '#1D4ED8', bg: '#DBEAFE', onPress: abrirLigacao },
    { titulo: 'WhatsApp', sub: 'Mande uma mensagem', icone: 'whatsapp', cor: '#16A34A', bg: '#DCFCE7', onPress: abrirWhatsApp },
    { titulo: 'Canal no YouTube', sub: 'Missas e vídeos', icone: 'youtube', cor: '#DC2626', bg: '#FEE2E2', onPress: abrirYouTube },
    { titulo: 'Enviar E-mail', sub: 'Dúvidas ou solicitações', icone: 'email-outline', cor: '#4B5563', bg: '#F3F4F6', onPress: abrirEmail },
  ];

  return (
    <SafeAreaView style={styles.containerHome}>
      <ScreenHeader title="Nossos Contatos" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.contentScroll}>
        {botoes.map((btn) => (
          <TouchableOpacity
            key={btn.titulo}
            onPress={btn.onPress}
            style={{ backgroundColor: btn.bg, padding: 15, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}
          >
            <View style={{ backgroundColor: btn.cor, padding: 10, borderRadius: 10, marginRight: 15 }}>
              <MaterialCommunityIcons name={btn.icone} size={24} color="#FFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{btn.titulo}</Text>
              <Text style={{ color: '#64748B' }}>{btn.sub}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
