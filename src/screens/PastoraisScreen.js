import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PASTORAIS_DATA } from '../constants';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/common';

export default function PastoraisScreen({ navigation }) {
  const [pastoralSelecionada, setPastoralSelecionada] = useState(null);

  return (
    <SafeAreaView style={styles.containerHome}>
      <ScreenHeader title="Pastorais" onBack={() => navigation.goBack()} backgroundColor="#7C3AED" />
      <ScrollView style={styles.contentScroll}>
        {PASTORAIS_DATA.map((pastoral) => (
          <TouchableOpacity
            key={pastoral.id}
            style={styles.cardItemOrganizado}
            onPress={() => setPastoralSelecionada(pastoral)}
          >
            <Image
              source={pastoral.imagemLista}
              style={{ width: 55, height: 55, borderRadius: 18, backgroundColor: pastoral.corCamiseta + '33' }}
            />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{pastoral.nome}</Text>
              <Text style={{ fontSize: 13, color: '#64748B' }}>Camiseta {pastoral.nomeCor}</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={22} color="#94A3B8" />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal visible={!!pastoralSelecionada} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { maxHeight: '85%' }]}>
            {pastoralSelecionada && (
              <ScrollView>
                <Image
                  source={pastoralSelecionada.imagem}
                  style={{ width: '100%', height: 160, borderRadius: 14, marginBottom: 15 }}
                  resizeMode="cover"
                />
                <Text style={[styles.modalTitulo, { textAlign: 'center' }]}>{pastoralSelecionada.nome}</Text>
                <Text style={{ color: '#475569', lineHeight: 24, marginBottom: 18 }}>
                  {pastoralSelecionada.descricao}
                </Text>
                <TouchableOpacity style={styles.modalBtnSalvar} onPress={() => setPastoralSelecionada(null)}>
                  <Text style={styles.modalBtnTextSalvar}>Fechar</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
