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

export default function MissasScreen({ navigation }) {
  const { perfil } = useAuth();
  const { infoBanco, atualizarListas } = useChurch();
  const [modalMissa, setModalMissa] = useState(false);
  const [nomeMissa, setNomeMissa] = useState('');
  const [horarioMissa, setHorarioMissa] = useState('');
  const hojeStr = DIAS_SEMANA[new Date().getDay()];
  const [diaMissa, setDiaMissa] = useState(hojeStr);
  const lista = infoBanco.listaMissas || [];
  const diasOrdenados = [hojeStr, ...DIAS_SEMANA.filter((d) => d !== hojeStr)];

  const handleSalvar = () => {
    if (!nomeMissa || !horarioMissa) return Alert.alert('Erro', 'Preencha nome e horário.');
    atualizarListas('listaMissas', [
      ...lista,
      { id: Date.now().toString(), nome: nomeMissa, horario: horarioMissa, diaDaSemana: diaMissa },
    ]);
    setModalMissa(false);
    setNomeMissa('');
    setHorarioMissa('');
  };

  return (
    <SafeAreaView style={styles.containerHome}>
      <ScreenHeader title="Horários das Missas" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.contentScroll}>
        {diasOrdenados.map((dia) => {
          const missas = lista.filter((m) => m.diaDaSemana === dia);
          if (dia !== hojeStr && missas.length === 0) return null;
          return (
            <View key={dia} style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1E3A8A' }}>{dia}</Text>
              {missas.length === 0 ? (
                <Text style={{ color: '#64748B', fontStyle: 'italic' }}>Nenhuma missa hoje.</Text>
              ) : (
                missas.map((missa) => (
                  <View key={missa.id} style={styles.cardItemOrganizado}>
                    <View style={[styles.cardIconCircle, { backgroundColor: '#DBEAFE' }]}>
                      <MaterialCommunityIcons name="clock-outline" size={26} color="#1E40AF" />
                    </View>
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text style={{ fontWeight: 'bold' }}>{missa.nome}</Text>
                      <Text style={{ color: '#64748B' }}>{missa.horario}</Text>
                    </View>
                    {perfil?.tipo === 'Admin' && (
                      <TouchableOpacity
                        onPress={() =>
                          Alert.alert('Remover', 'Excluir?', [
                            { text: 'Cancelar' },
                            {
                              text: 'Sim',
                              onPress: () =>
                                atualizarListas(
                                  'listaMissas',
                                  lista.filter((i) => i.id !== missa.id)
                                ),
                            },
                          ])
                        }
                      >
                        <MaterialCommunityIcons name="trash-can-outline" size={22} color="#EF4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                ))
              )}
            </View>
          );
        })}
        {perfil?.tipo === 'Admin' && (
          <TouchableOpacity style={styles.btnAdicionarNovo} onPress={() => setModalMissa(true)}>
            <MaterialCommunityIcons name="plus" size={24} color="#FFF" />
            <Text style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 5 }}>Adicionar Horário</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Modal visible={modalMissa} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Novo Horário</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {DIAS_SEMANA.map((dia) => (
                <TouchableOpacity
                  key={dia}
                  onPress={() => setDiaMissa(dia)}
                  style={{
                    backgroundColor: diaMissa === dia ? '#1E40AF' : '#E2E8F0',
                    padding: 10,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: diaMissa === dia ? '#FFF' : '#475569' }}>{dia}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TextInput style={styles.inputSimples} placeholder="Nome da missa" value={nomeMissa} onChangeText={setNomeMissa} />
            <TextInput style={styles.inputSimples} placeholder="Horário" value={horarioMissa} onChangeText={setHorarioMissa} />
            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.modalBtnCancelar} onPress={() => setModalMissa(false)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalBtnSalvar} onPress={handleSalvar}>
                <Text style={styles.modalBtnTextSalvar}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
