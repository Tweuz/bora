import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DIAS_SEMANA } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useChurch } from '../context/ChurchContext';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/common';

export default function ConfissoesScreen({ navigation }) {
  const { perfil } = useAuth();
  const { infoBanco, atualizarListas } = useChurch();
  const [modalConf, setModalConf] = useState(false);
  const [nomeConf, setNomeConf] = useState('');
  const [horarioConf, setHorarioConf] = useState('');
  const hojeStr = DIAS_SEMANA[new Date().getDay()];
  const [diaConf, setDiaConf] = useState(hojeStr);
  const lista = infoBanco.listaConfissoes || [];
  const diasOrdenados = [hojeStr, ...DIAS_SEMANA.filter((d) => d !== hojeStr)];

  return (
    <SafeAreaView style={styles.containerHome}>
      <ScreenHeader title="Confissões" onBack={() => navigation.goBack()} backgroundColor="#6D28D9" />
      <ScrollView style={styles.contentScroll}>
        {diasOrdenados.map((dia) => {
          const items = lista.filter((c) => c.diaDaSemana === dia);
          if (dia !== hojeStr && items.length === 0) return null;
          return (
            <View key={dia} style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#6D28D9' }}>{dia}</Text>
              {items.map((conf) => (
                <View key={conf.id} style={styles.cardItemOrganizado}>
                  <View style={[styles.cardIconCircle, { backgroundColor: '#EDE9FE' }]}>
                    <MaterialCommunityIcons name="book-cross" size={26} color="#6D28D9" />
                  </View>
                  <View style={{ flex: 1, marginLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}>{conf.nome}</Text>
                    <Text style={{ color: '#64748B' }}>{conf.horario}</Text>
                  </View>
                  {perfil?.tipo === 'Admin' && (
                    <TouchableOpacity
                      onPress={() =>
                        atualizarListas(
                          'listaConfissoes',
                          lista.filter((i) => i.id !== conf.id)
                        )
                      }
                    >
                      <MaterialCommunityIcons name="trash-can-outline" size={22} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
          );
        })}
        {perfil?.tipo === 'Admin' && (
          <TouchableOpacity
            style={[styles.btnAdicionarNovo, { backgroundColor: '#6D28D9' }]}
            onPress={() => setModalConf(true)}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>+ Adicionar</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Modal visible={modalConf} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Nova Confissão</Text>
            <TextInput style={styles.inputSimples} value={nomeConf} onChangeText={setNomeConf} placeholder="Padre/Local" />
            <TextInput style={styles.inputSimples} value={horarioConf} onChangeText={setHorarioConf} placeholder="Horário" />
            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.modalBtnCancelar} onPress={() => setModalConf(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnSalvar, { backgroundColor: '#6D28D9' }]}
                onPress={() => {
                  if (!nomeConf || !horarioConf) return Alert.alert('Erro', 'Preencha os campos.');
                  atualizarListas('listaConfissoes', [
                    ...lista,
                    { id: Date.now().toString(), nome: nomeConf, horario: horarioConf, diaDaSemana: diaConf },
                  ]);
                  setModalConf(false);
                }}
              >
                <Text style={styles.modalBtnTextSalvar}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
