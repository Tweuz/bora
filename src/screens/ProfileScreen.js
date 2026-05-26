import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { saveUserProfile } from '../services/userService';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/common';

export default function ProfileScreen({ navigation }) {
  const { user, perfil, updatePerfil } = useAuth();
  const { colors } = useTheme();
  const [nome, setNome] = useState(perfil?.nome || '');
  const [pastoral, setPastoral] = useState(perfil?.pastoralEscolhida || '');
  const [loading, setLoading] = useState(false);

  const handleSalvar = async () => {
    if (!nome.trim()) return Alert.alert('Erro', 'Informe seu nome.');
    setLoading(true);
    try {
      const dados = { nome: nome.trim(), pastoralEscolhida: pastoral };
      await saveUserProfile(user.uid, dados);
      updatePerfil(dados);
      Alert.alert('Sucesso', 'Perfil atualizado no Firestore!');
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.containerHome, { backgroundColor: colors.background, flex: 1 }]}>
      <ScreenHeader title="Perfil" showMenu onMenuPress={() => navigation.openDrawer()} />
      <ScrollView style={styles.contentScroll}>
        <View style={[styles.cardItemOrganizado, { backgroundColor: colors.card, flexDirection: 'column', alignItems: 'flex-start', padding: 20, marginTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View style={[styles.cardIconCircle, { backgroundColor: '#DBEAFE', width: 70, height: 70, borderRadius: 35 }]}>
              <MaterialCommunityIcons name="account-circle" size={40} color="#1E40AF" />
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{perfil?.nome}</Text>
              <Text style={{ color: colors.subtext }}>{perfil?.tipo || 'Fiel'}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="email-outline" size={18} color={colors.subtext} />
            <Text style={{ marginLeft: 8, color: colors.subtext }}>{perfil?.email}</Text>
          </View>
        </View>

        <Text style={[styles.secaoTitulo, { color: colors.text }]}>Editar Perfil</Text>
        <View style={styles.inputGroupAuth}>
          <Text style={styles.labelAuth}>Nome</Text>
          <TextInput
            style={[styles.inputSimples, { backgroundColor: colors.card, color: colors.text }]}
            value={nome}
            onChangeText={setNome}
            placeholder="Seu nome"
            placeholderTextColor={colors.subtext}
          />
        </View>
        <View style={styles.inputGroupAuth}>
          <Text style={styles.labelAuth}>Pastoral</Text>
          <TextInput
            style={[styles.inputSimples, { backgroundColor: colors.card, color: colors.text }]}
            value={pastoral}
            onChangeText={setPastoral}
            placeholder="Ex: familia, juventude..."
            placeholderTextColor={colors.subtext}
          />
        </View>

        <TouchableOpacity
          style={[styles.btnAdicionarNovo, { opacity: loading ? 0.7 : 1 }]}
          onPress={handleSalvar}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Salvar no Firestore</Text>
          )}
        </TouchableOpacity>

        {perfil?.favoritos?.length > 0 && (
          <>
            <Text style={[styles.secaoTitulo, { color: colors.text }]}>Favoritos salvos</Text>
            <Text style={{ color: colors.subtext, marginBottom: 20 }}>
              Dias litúrgicos favoritos: {perfil.favoritos.join(', ')}
            </Text>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
