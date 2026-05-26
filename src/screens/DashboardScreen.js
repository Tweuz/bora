import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFetchData } from '../hooks/useFetchData';
import { API_LITURGIA_URL, CORES_LITURGICAS } from '../constants';
import { resumoEvangelho } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { styles } from '../styles/common';

export default function DashboardScreen({ navigation }) {
  const { perfil } = useAuth();
  const { colors } = useTheme();
  const [filtro, setFiltro] = useState('');

  const { data: liturgias, loading, error, refetch } = useFetchData(API_LITURGIA_URL);

  const listaFiltrada = useMemo(() => {
    if (!liturgias) return [];
    const lista = Array.isArray(liturgias) ? liturgias : [liturgias];
    const termo = filtro.trim().toLowerCase();
    if (!termo) return lista;
    return lista.filter(
      (item) =>
        item.liturgia?.toLowerCase().includes(termo) ||
        item.data?.toLowerCase().includes(termo) ||
        item.cor?.toLowerCase().includes(termo)
    );
  }, [liturgias, filtro]);

  return (
    <SafeAreaView style={[styles.containerHome, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.blueHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 12 }}>
            <MaterialCommunityIcons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.saudacaoHome}>Liturgia da Semana</Text>
            <Text style={styles.nomeUsuarioHome}>{perfil?.nome || 'Usuário'}</Text>
          </View>
          <View style={styles.badgeTipo}>
            <Text style={styles.badgeText}>{perfil?.tipo || 'Fiel'}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.secaoTitulo, { color: colors.text }]}>Orações e leituras da Missa</Text>
        <Text style={{ color: colors.subtext, marginBottom: 12, fontSize: 14, lineHeight: 20 }}>
          Dados da API Liturgia Diária (Igreja Católica, em português). Mostra os próximos 7 dias —
          igual ao calendário que a paróquia usa nas celebrações. Toque em um dia para ver tudo.
        </Text>

        <TextInput
          style={[
            styles.searchInput,
            { backgroundColor: colors.card, color: colors.text, borderColor: colors.border },
          ]}
          placeholder="Filtrar por data, festa ou cor litúrgica..."
          placeholderTextColor={colors.subtext}
          value={filtro}
          onChangeText={setFiltro}
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1E3A8A" />
            <Text style={styles.loadingText}>Carregando liturgia...</Text>
          </View>
        )}

        {error && !loading && (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ color: '#EF4444', marginBottom: 10, textAlign: 'center' }}>{error}</Text>
            <TouchableOpacity onPress={refetch} style={styles.btnAdicionarNovo}>
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {!loading &&
          !error &&
          listaFiltrada.map((item) => {
            const corFundo = CORES_LITURGICAS[item.cor] || '#E2E8F0';
            const textoCor = item.cor === 'Branco' ? '#1E293B' : '#FFF';
            return (
              <TouchableOpacity
                key={item.data}
                style={[styles.postCard, { backgroundColor: colors.card }]}
                onPress={() => navigation.navigate('Detalhes', { item })}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <MaterialCommunityIcons name="calendar" size={18} color="#1E3A8A" />
                  <Text style={{ marginLeft: 8, fontWeight: 'bold', color: colors.text }}>
                    {item.data}
                  </Text>
                  <View
                    style={{
                      marginLeft: 'auto',
                      backgroundColor: corFundo,
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                      borderWidth: item.cor === 'Branco' ? 1 : 0,
                      borderColor: '#CBD5E1',
                    }}
                  >
                    <Text style={{ color: textoCor, fontSize: 12, fontWeight: 'bold' }}>
                      Cor: {item.cor}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.postTitle, { color: colors.text }]} numberOfLines={2}>
                  {item.liturgia}
                </Text>
                <Text style={[styles.postBody, { color: colors.subtext, marginTop: 6 }]} numberOfLines={2}>
                  Evangelho: {resumoEvangelho(item)}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                  <MaterialCommunityIcons name="book-open-page-variant" size={18} color="#1E3A8A" />
                  <Text style={{ color: '#1E3A8A', fontSize: 13, fontWeight: '600', marginLeft: 4 }}>
                    Ver leituras e orações
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

        {!loading && !error && listaFiltrada.length === 0 && (
          <Text style={{ color: colors.subtext, textAlign: 'center', marginTop: 20 }}>
            Nenhum dia encontrado para &quot;{filtro}&quot;.
          </Text>
        )}

        <Text style={[styles.secaoTitulo, { color: colors.text, marginTop: 24 }]}>Paróquia</Text>
        <TouchableOpacity
          style={[styles.btnVerMais, { backgroundColor: '#DBEAFE' }]}
          onPress={() => navigation.navigate('HomeParoquia')}
        >
          <MaterialCommunityIcons name="church" size={20} color="#1E40AF" />
          <Text style={[styles.btnVerMaisText, { marginLeft: 8 }]}>Voltar ao Início da Paróquia</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
