import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { toggleFavorite } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ScreenHeader from '../components/ScreenHeader';
import { CORES_LITURGICAS } from '../constants';
import { styles } from '../styles/common';

function BlocoLeitura({ titulo, referencia, texto, colors }) {
  if (!texto) return null;
  return (
    <View
      style={[
        styles.cardItemOrganizado,
        { backgroundColor: colors.card, flexDirection: 'column', alignItems: 'flex-start', marginBottom: 12 },
      ]}
    >
      <Text style={{ fontWeight: 'bold', color: '#1E3A8A', marginBottom: 4 }}>{titulo}</Text>
      {referencia ? (
        <Text style={{ color: colors.subtext, fontSize: 12, marginBottom: 6 }}>{referencia}</Text>
      ) : null}
      <Text style={{ color: colors.text, lineHeight: 22, fontSize: 15 }}>{texto}</Text>
    </View>
  );
}

export default function DetailsScreen({ route, navigation }) {
  const { item: liturgia } = route.params;
  const { user, perfil, updatePerfil } = useAuth();
  const { colors } = useTheme();
  const [favoritos, setFavoritos] = useState(perfil?.favoritos || []);
  const [salvando, setSalvando] = useState(false);

  const idDia = liturgia.data;
  const isFavorito = favoritos.includes(idDia);

  const primeiraLeitura = liturgia.leituras?.primeiraLeitura?.[0];
  const salmo = liturgia.leituras?.salmo?.[0];
  const evangelho = liturgia.leituras?.evangelho?.[0];

  const handleFavorito = async () => {
    if (!user) return;
    setSalvando(true);
    try {
      const novos = await toggleFavorite(user.uid, idDia);
      setFavoritos(novos);
      updatePerfil({ favoritos: novos });
      Alert.alert(
        'Sucesso',
        isFavorito
          ? `Liturgia de ${idDia} removida dos favoritos.`
          : `Liturgia de ${idDia} salva nos favoritos (Firestore).`
      );
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar no Firestore.');
    } finally {
      setSalvando(false);
    }
  };

  const corFundo = CORES_LITURGICAS[liturgia.cor] || '#E2E8F0';

  return (
    <SafeAreaView style={[styles.containerHome, { backgroundColor: colors.background, flex: 1 }]}>
      <ScreenHeader title="Liturgia do dia" onBack={() => navigation.goBack()} />
      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.postCard, { backgroundColor: colors.card, marginTop: 20 }]}>
          <Text style={{ fontSize: 14, color: colors.subtext, marginBottom: 6 }}>
            <MaterialCommunityIcons name="calendar" size={14} /> {liturgia.data}
          </Text>
          <Text style={[styles.postTitle, { color: colors.text, fontSize: 18 }]}>{liturgia.liturgia}</Text>
          <View
            style={{
              alignSelf: 'flex-start',
              backgroundColor: corFundo,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 8,
              marginTop: 10,
              borderWidth: liturgia.cor === 'Branco' ? 1 : 0,
              borderColor: '#CBD5E1',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: liturgia.cor === 'Branco' ? '#1E293B' : '#FFF' }}>
              Cor litúrgica: {liturgia.cor}
            </Text>
          </View>
        </View>

        <Text style={[styles.secaoTitulo, { color: colors.text }]}>Orações da Missa</Text>
        <BlocoLeitura titulo="Oração da Coleta" texto={liturgia.oracoes?.coleta} colors={colors} />
        <BlocoLeitura titulo="Oração sobre as Oferendas" texto={liturgia.oracoes?.oferendas} colors={colors} />
        <BlocoLeitura titulo="Oração depois da Comunhão" texto={liturgia.oracoes?.comunhao} colors={colors} />

        <Text style={[styles.secaoTitulo, { color: colors.text }]}>Leituras</Text>
        <BlocoLeitura
          titulo={primeiraLeitura?.titulo || 'Primeira leitura'}
          referencia={primeiraLeitura?.referencia}
          texto={primeiraLeitura?.texto}
          colors={colors}
        />
        <BlocoLeitura
          titulo="Salmo"
          referencia={salmo?.referencia ? `${salmo.referencia} — ${salmo.refrao || ''}` : salmo?.refrao}
          texto={salmo?.texto}
          colors={colors}
        />
        <BlocoLeitura
          titulo={evangelho?.titulo || 'Evangelho'}
          referencia={evangelho?.referencia}
          texto={evangelho?.texto}
          colors={colors}
        />

        {liturgia.antifonas?.entrada ? (
          <>
            <Text style={[styles.secaoTitulo, { color: colors.text }]}>Antífonas</Text>
            <BlocoLeitura titulo="Entrada" texto={liturgia.antifonas.entrada} colors={colors} />
            {liturgia.antifonas.comunhao ? (
              <BlocoLeitura titulo="Comunhão" texto={liturgia.antifonas.comunhao} colors={colors} />
            ) : null}
          </>
        ) : null}

        <TouchableOpacity
          style={[
            styles.btnAdicionarNovo,
            {
              backgroundColor: isFavorito ? '#F59E0B' : '#1E40AF',
              marginTop: 10,
              marginBottom: 30,
              opacity: salvando ? 0.7 : 1,
            },
          ]}
          onPress={handleFavorito}
          disabled={salvando}
        >
          <MaterialCommunityIcons name={isFavorito ? 'star' : 'star-outline'} size={22} color="#FFF" />
          <Text style={{ color: '#FFF', fontWeight: 'bold', marginLeft: 8 }}>
            {salvando
              ? 'Salvando...'
              : isFavorito
                ? 'Remover dos favoritos'
                : 'Salvar este dia nos favoritos'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
