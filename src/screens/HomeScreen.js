import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DIAS_SEMANA } from '../constants';
import { useAuth } from '../context/AuthContext';
import { useChurch } from '../context/ChurchContext';
import NotificacaoTopo from '../components/NotificacaoTopo';
import ModalEdicao from '../components/ModalEdicao';
import { styles } from '../styles/common';

export default function HomeScreen({ navigation }) {
  const { perfil } = useAuth();
  const { infoBanco, salvarEdicao } = useChurch();
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [modalEdit, setModalEdit] = useState({ visivel: false, campo: '', titulo: '', valor: '' });

  const hojeStr = DIAS_SEMANA[new Date().getDay()];
  const missasDeHoje = (infoBanco.listaMissas || []).filter((m) => m.diaDaSemana === hojeStr);
  const confissoesDeHoje = (infoBanco.listaConfissoes || []).filter((c) => c.diaDaSemana === hojeStr);

  useEffect(() => {
    const timer = setTimeout(() => setMostrarPopUp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const abrirEdicao = (campo, titulo, valor) =>
    setModalEdit({ visivel: true, campo, titulo, valor });

  const handleSalvarEdicao = async (novoValor) => {
    await salvarEdicao(modalEdit.campo, novoValor);
    setModalEdit({ ...modalEdit, visivel: false });
  };

  return (
    <SafeAreaView style={styles.containerHome}>
      <StatusBar barStyle="light-content" />
      <NotificacaoTopo visivel={mostrarPopUp} setVisivel={setMostrarPopUp} navigation={navigation} />

      <View style={styles.blueHeader}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 12 }}>
            <MaterialCommunityIcons name="menu" size={28} color="#FFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.saudacaoHome}>Olá,</Text>
            <Text style={styles.nomeUsuarioHome}>{perfil?.nome || 'Amigo(a)'}</Text>
          </View>
          <View style={styles.badgeTipo}>
            <Text style={styles.badgeText}>{perfil?.tipo || 'Fiel'}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.cardOracao}>
          <View style={styles.linhaOracao}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="hands-pray" size={24} color="#92400E" />
              <Text style={styles.tituloOracao}>Oração do Dia</Text>
            </View>
            {perfil?.tipo === 'Admin' && (
              <TouchableOpacity onPress={() => abrirEdicao('oracao', 'Oração do Dia', infoBanco.oracao)}>
                <MaterialCommunityIcons name="pencil-circle" size={28} color="#D97706" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.textoOracao}>{infoBanco.oracao}</Text>
        </View>

        <Text style={[styles.secaoTitulo, { marginTop: 0 }]}>Missas de Hoje ({hojeStr})</Text>
        {missasDeHoje.length === 0 ? (
          <View style={[styles.cardNovo, { justifyContent: 'center' }]}>
            <Text style={{ color: '#64748B' }}>Nenhuma missa cadastrada para hoje.</Text>
          </View>
        ) : (
          missasDeHoje.map((missa, index) => (
            <View key={index} style={styles.cardNovo}>
              <View style={[styles.cardIconCircle, { backgroundColor: '#DBEAFE' }]}>
                <MaterialCommunityIcons name="church" size={30} color="#1E40AF" />
              </View>
              <View style={styles.cardInfoContent}>
                <Text style={styles.cardTituloInterno}>{missa.nome}</Text>
                <Text style={styles.cardTextoInterno}>{missa.horario}</Text>
              </View>
            </View>
          ))
        )}
        <TouchableOpacity style={styles.btnVerMais} onPress={() => navigation.navigate('Missas')}>
          <Text style={styles.btnVerMaisText}>
            {perfil?.tipo === 'Admin' ? 'Gerenciar horários de missas' : 'Ver missas de todos os dias'}
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#1E40AF" />
        </TouchableOpacity>

        <Text style={styles.secaoTitulo}>Confissões de Hoje</Text>
        {confissoesDeHoje.length === 0 ? (
          <View style={[styles.cardNovo, { justifyContent: 'center' }]}>
            <Text style={{ color: '#64748B' }}>Nenhuma confissão cadastrada para hoje.</Text>
          </View>
        ) : (
          confissoesDeHoje.map((conf, index) => (
            <View key={index} style={styles.cardNovo}>
              <View style={[styles.cardIconCircle, { backgroundColor: '#EDE9FE' }]}>
                <MaterialCommunityIcons name="book-cross" size={30} color="#6D28D9" />
              </View>
              <View style={styles.cardInfoContent}>
                <Text style={styles.cardTituloInterno}>{conf.nome}</Text>
                <Text style={styles.cardTextoInterno}>{conf.horario}</Text>
              </View>
            </View>
          ))
        )}
        <TouchableOpacity
          style={[styles.btnVerMais, { backgroundColor: '#EDE9FE' }]}
          onPress={() => navigation.navigate('Confissoes')}
        >
          <Text style={[styles.btnVerMaisText, { color: '#6D28D9' }]}>Ver confissões de todos os dias</Text>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#6D28D9" />
        </TouchableOpacity>

        <Text style={styles.secaoTitulo}>Campanha da Alimentação</Text>
        <View style={styles.cardAlimentos}>
          <View style={styles.alimentosHeader}>
            <MaterialCommunityIcons name="heart" size={28} color="#FFF" />
            <Text style={styles.alimentosTitulo}>Cesta Básica</Text>
          </View>
          <Text style={styles.alimentosDesc}>
            Precisamos da sua ajuda para montar as cestas básicas desta semana.
          </Text>
          <TouchableOpacity style={styles.btnDoarAgora} onPress={() => navigation.navigate('Campanhas')}>
            <Text style={styles.btnDoarText}>
              {perfil?.tipo === 'Admin' ? 'GERENCIAR ITENS' : 'VER CAMPANHA E DOAR'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.btnVerMais, { backgroundColor: '#E0E7FF', marginTop: 15 }]}
          onPress={() => navigation.navigate('Dashboard')}
        >
          <MaterialCommunityIcons name="book-cross" size={20} color="#4338CA" />
          <Text style={[styles.btnVerMaisText, { color: '#4338CA', marginLeft: 8 }]}>
            Liturgia da semana (leituras da Missa)
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', gap: 12, marginTop: 15 }}>
          <TouchableOpacity
            style={[styles.btnVerMais, { flex: 1, backgroundColor: '#EDE9FE' }]}
            onPress={() => navigation.navigate('Pastorais')}
          >
            <MaterialCommunityIcons name="account-group-outline" size={20} color="#7C3AED" />
            <Text style={[styles.btnVerMaisText, { color: '#7C3AED', marginLeft: 6 }]}>Pastorais</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnVerMais, { flex: 1, backgroundColor: '#DCFCE7' }]}
            onPress={() => navigation.navigate('Contato')}
          >
            <MaterialCommunityIcons name="phone-outline" size={20} color="#16A34A" />
            <Text style={[styles.btnVerMaisText, { color: '#16A34A', marginLeft: 6 }]}>Contato</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <ModalEdicao
        visivel={modalEdit.visivel}
        fechar={() => setModalEdit({ ...modalEdit, visivel: false })}
        titulo={modalEdit.titulo}
        valorAtual={modalEdit.valor}
        onSalvar={handleSalvarEdicao}
      />
    </SafeAreaView>
  );
}
