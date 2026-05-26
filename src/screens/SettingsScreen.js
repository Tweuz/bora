import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Switch,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ScreenHeader from '../components/ScreenHeader';
import { styles } from '../styles/common';

export default function SettingsScreen({ navigation }) {
  const { perfil, logout } = useAuth();
  const { temaDark, setTemaDark, colors } = useTheme();
  const [modalExcluir, setModalExcluir] = useState(false);
  const [confirmarExcluir, setConfirmarExcluir] = useState(false);
  const [senhaExcluir, setSenhaExcluir] = useState('');

  const handleExcluirConta = async () => {
    if (!confirmarExcluir) return Alert.alert('Atenção', 'Marque a caixa de confirmação.');
    if (!senhaExcluir) return Alert.alert('Erro', 'Digite sua senha.');

    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, senhaExcluir);
      await reauthenticateWithCredential(user, credential);
      await deleteDoc(doc(db, 'usuarios', user.uid));
      await deleteUser(user);
      setModalExcluir(false);
      Alert.alert('Conta excluída', 'Sua conta foi removida.');
      logout();
    } catch {
      Alert.alert('Erro', 'Não foi possível excluir. Verifique sua senha.');
    }
  };

  return (
    <SafeAreaView style={[styles.containerHome, { backgroundColor: colors.background, flex: 1 }]}>
      <ScreenHeader title="Configurações" showMenu onMenuPress={() => navigation.openDrawer()} />
      <ScrollView style={styles.contentScroll}>
        <Text style={[styles.secaoTitulo, { color: colors.text }]}>Minha Conta</Text>
        <View style={[styles.cardItemOrganizado, { backgroundColor: colors.card, flexDirection: 'column', alignItems: 'flex-start', padding: 20 }]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text }}>{perfil?.nome}</Text>
          <Text style={{ color: colors.subtext, marginTop: 4 }}>{perfil?.email}</Text>
        </View>

        <TouchableOpacity
          style={[styles.cardItemOrganizado, { backgroundColor: colors.card, marginTop: 10 }]}
          onPress={() => navigation.navigate('InicioStack', { screen: 'Recuperar' })}
        >
          <View style={[styles.cardIconCircle, { backgroundColor: '#FEF9C3' }]}>
            <MaterialCommunityIcons name="lock-reset" size={26} color="#CA8A04" />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>Trocar Senha</Text>
            <Text style={{ fontSize: 13, color: colors.subtext }}>Link de redefinição por e-mail</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={22} color="#94A3B8" />
        </TouchableOpacity>

        <Text style={[styles.secaoTitulo, { color: colors.text }]}>Aparência</Text>
        <View style={[styles.cardItemOrganizado, { backgroundColor: colors.card }]}>
          <View style={[styles.cardIconCircle, { backgroundColor: temaDark ? '#1E293B' : '#F1F5F9' }]}>
            <MaterialCommunityIcons
              name={temaDark ? 'weather-night' : 'white-balance-sunny'}
              size={26}
              color={temaDark ? '#818CF8' : '#F59E0B'}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colors.text }}>
              Tema {temaDark ? 'Escuro' : 'Claro'}
            </Text>
          </View>
          <Switch value={temaDark} onValueChange={setTemaDark} thumbColor={temaDark ? '#6366F1' : '#FFF'} />
        </View>

        <Text style={[styles.secaoTitulo, { color: colors.text }]}>Conta</Text>
        <TouchableOpacity
          style={[styles.cardItemOrganizado, { backgroundColor: colors.card, marginBottom: 10 }]}
          onPress={() =>
            Alert.alert('Sair', 'Deseja sair?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Sair', style: 'destructive', onPress: logout },
            ])
          }
        >
          <View style={[styles.cardIconCircle, { backgroundColor: '#FEE2E2' }]}>
            <MaterialCommunityIcons name="logout" size={26} color="#EF4444" />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#EF4444' }}>Sair da Conta</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cardItemOrganizado, { backgroundColor: colors.card }]}
          onPress={() => {
            setModalExcluir(true);
            setConfirmarExcluir(false);
            setSenhaExcluir('');
          }}
        >
          <View style={[styles.cardIconCircle, { backgroundColor: '#FEE2E2' }]}>
            <MaterialCommunityIcons name="account-remove-outline" size={26} color="#DC2626" />
          </View>
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#DC2626' }}>Excluir Conta</Text>
          </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      <Modal visible={modalExcluir} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={[styles.modalTitulo, { color: '#DC2626' }]}>Excluir Conta</Text>
            <TextInput
              style={styles.inputSimples}
              placeholder="Sua senha"
              secureTextEntry
              value={senhaExcluir}
              onChangeText={setSenhaExcluir}
            />
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
              onPress={() => setConfirmarExcluir(!confirmarExcluir)}
            >
              <MaterialCommunityIcons
                name={confirmarExcluir ? 'checkbox-marked' : 'checkbox-blank-outline'}
                size={24}
                color="#DC2626"
              />
              <Text style={{ marginLeft: 8, flex: 1, color: '#475569' }}>
                Entendo que esta ação é irreversível.
              </Text>
            </TouchableOpacity>
            <View style={styles.modalBotoes}>
              <TouchableOpacity style={styles.modalBtnCancelar} onPress={() => setModalExcluir(false)}>
                <Text style={styles.modalBtnTextCancelar}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtnSalvar, { backgroundColor: '#DC2626' }]}
                onPress={handleExcluirConta}
              >
                <Text style={styles.modalBtnTextSalvar}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
