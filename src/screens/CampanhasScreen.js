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
import { useAuth } from '../context/AuthContext';
import { useChurch } from '../context/ChurchContext';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/common';

export default function CampanhasScreen({ navigation }) {
  const { perfil } = useAuth();
  const { infoBanco, atualizarListas } = useChurch();
  const [modalItem, setModalItem] = useState(false);
  const [modalBaixa, setModalBaixa] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [novaQtd, setNovaQtd] = useState('');
  const [nomeItem, setNomeItem] = useState('');
  const [metaItem, setMetaItem] = useState('');
  const lista = infoBanco.listaDoacoes || [];
  const itensFaltando = lista.filter((item) => (item.atual || 0) < (item.meta || 0));

  return (
    <SafeAreaView style={styles.containerHome}>
      <ScreenHeader title="Campanha da Alimentação" onBack={() => navigation.goBack()} backgroundColor="#10B981" />
      <ScrollView style={styles.contentScroll}>
        <View style={[styles.cardAlimentos, { marginTop: 20 }]}>
          <View style={styles.alimentosHeader}>
            <MaterialCommunityIcons name="basket" size={28} color="#FFF" />
            <Text style={styles.alimentosTitulo}>Cesta Básica</Text>
          </View>
          {perfil?.tipo !== 'Admin' ? (
            itensFaltando.length === 0 ? (
              <Text style={{ color: '#FFF', textAlign: 'center', padding: 20 }}>
                Todas as metas foram batidas!
              </Text>
            ) : (
              itensFaltando.map((item) => (
                <View
                  key={item.id}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: 15,
                    borderRadius: 10,
                    marginBottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item.nome}</Text>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Como Doar?', 'Receba orientações na secretaria paroquial.')}
                    style={{ backgroundColor: '#FFF', padding: 8, borderRadius: 20 }}
                  >
                    <Text style={{ color: '#1D4ED8', fontWeight: 'bold', fontSize: 12 }}>QUERO DOAR</Text>
                  </TouchableOpacity>
                </View>
              ))
            )
          ) : (
            lista.map((item) => (
              <View key={item.id} style={{ backgroundColor: '#1D4ED8', padding: 12, borderRadius: 10, marginBottom: 8 }}>
                <Text style={{ color: '#FFF', fontWeight: 'bold' }}>{item.nome}</Text>
                <Text style={{ color: '#DBEAFE' }}>
                  Tem: {item.atual} | Meta: {item.meta}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setItemSelecionado(item);
                    setNovaQtd(String(item.atual));
                    setModalBaixa(true);
                  }}
                  style={{ marginTop: 8 }}
                >
                  <Text style={{ color: '#10B981', fontWeight: 'bold' }}>ATUALIZAR ESTOQUE</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
          {perfil?.tipo === 'Admin' && (
            <TouchableOpacity style={[styles.btnAdicionarNovo, { backgroundColor: '#047857', marginTop: 15 }]} onPress={() => setModalItem(true)}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>+ CADASTRAR ITEM</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <Modal visible={modalBaixa} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              onPress={() => setModalBaixa(false)}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
            >
              <MaterialCommunityIcons name="arrow-left" size={22} color="#1E3A8A" />
              <Text style={{ marginLeft: 6, color: '#1E3A8A', fontWeight: 'bold', fontSize: 15 }}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitulo}>Atualizar estoque: {itemSelecionado?.nome}</Text>
            <Text style={{ color: '#64748B', marginBottom: 10, fontSize: 14 }}>
              Digite a quantidade total que a paróquia tem agora:
            </Text>
            <TextInput
              style={styles.inputSimples}
              value={novaQtd}
              onChangeText={setNovaQtd}
              keyboardType="numeric"
              placeholder="Ex: 20"
            />
            <View style={styles.modalBotoes}>
              <TouchableOpacity
                style={styles.modalBtnCancelar}
                onPress={() => setModalBaixa(false)}
              >
                <Text style={styles.modalBtnTextCancelar}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnSalvar, { backgroundColor: '#10B981' }]}
                onPress={() => {
                  const valor = parseInt(novaQtd, 10);
                  if (isNaN(valor)) return Alert.alert('Erro', 'Número inválido.');
                  atualizarListas(
                    'listaDoacoes',
                    lista.map((i) => (i.id === itemSelecionado.id ? { ...i, atual: valor } : i))
                  );
                  setModalBaixa(false);
                }}
              >
                <Text style={styles.modalBtnTextSalvar}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={modalItem} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              onPress={() => setModalItem(false)}
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
            >
              <MaterialCommunityIcons name="arrow-left" size={22} color="#1E3A8A" />
              <Text style={{ marginLeft: 6, color: '#1E3A8A', fontWeight: 'bold', fontSize: 15 }}>Voltar</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitulo}>Cadastrar item na campanha</Text>
            <TextInput style={styles.inputSimples} placeholder="Alimento" value={nomeItem} onChangeText={setNomeItem} />
            <TextInput
              style={styles.inputSimples}
              placeholder="Meta de arrecadação"
              value={metaItem}
              onChangeText={setMetaItem}
              keyboardType="numeric"
            />
            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.modalBtnCancelar} onPress={() => setModalItem(false)}>
                <Text style={styles.modalBtnTextCancelar}>Voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnSalvar, { backgroundColor: '#10B981' }]}
                onPress={() => {
                  if (!nomeItem || !metaItem) return Alert.alert('Erro', 'Preencha nome e meta.');
                  atualizarListas('listaDoacoes', [
                    ...lista,
                    { id: Date.now().toString(), nome: nomeItem, meta: parseInt(metaItem, 10), atual: 0 },
                  ]);
                  setModalItem(false);
                  setNomeItem('');
                  setMetaItem('');
                }}
              >
                <Text style={styles.modalBtnTextSalvar}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
