import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../styles/common';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEntrar = async () => {
    if (!email || !senha) return Alert.alert('Erro', 'Preencha tudo!');
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), senha);
      const docSnap = await getDoc(doc(db, 'usuarios', userCredential.user.uid));
      if (docSnap.exists()) {
        login(userCredential.user, docSnap.data());
      } else {
        Alert.alert('Erro', 'Perfil não encontrado.');
      }
    } catch {
      Alert.alert('Erro', 'E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerAuth}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContentAuth}>
        <View style={styles.cardAuth}>
          <View style={styles.iconContainerAuth}>
            <View style={[styles.iconCircleAuth, { backgroundColor: '#1E3A8A' }]}>
              <MaterialCommunityIcons name="church" size={50} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.tituloAuth}>Paróquia Maria Imaculada</Text>
          <Text style={styles.subtituloAuth}>Bem-vindo(a) de volta!</Text>

          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>E-mail</Text>
            <View style={styles.inputContainerAuth}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#9CA3AF" style={styles.inputIconAuth} />
              <TextInput
                style={styles.inputAuth}
                placeholder="Seu e-mail"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>Senha</Text>
            <View style={styles.inputContainerAuth}>
              <MaterialCommunityIcons name="lock-outline" size={20} color="#9CA3AF" style={styles.inputIconAuth} />
              <TextInput
                style={styles.inputAuth}
                placeholder="Sua senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
              />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.eyeIconAuth}>
                <MaterialCommunityIcons
                  name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <View style={{ alignItems: 'center', paddingVertical: 16 }}>
              <ActivityIndicator size="large" color="#1E3A8A" />
              <Text style={{ marginTop: 10, color: '#64748B' }}>Autenticando no Firebase...</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.botaoEntrarAuth, { backgroundColor: '#1E3A8A' }]}
              onPress={handleEntrar}
            >
              <Text style={styles.botaoEntrarTextAuth}>Entrar</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={() => navigation.navigate('Recuperar')} style={{ marginTop: 15 }}>
            <Text style={[styles.linkEsqueciTextAuth, { color: '#1E3A8A' }]}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <View style={styles.cadastroContainerAuth}>
            <Text style={styles.cadastroTextAuth}>Ainda não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={[styles.cadastroLinkAuth, { color: '#1E3A8A' }]}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
