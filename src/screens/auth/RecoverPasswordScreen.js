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
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { styles } from '../../styles/common';

export default function RecoverPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleRecuperar = () => {
    if (!email) return Alert.alert('Aviso', 'Por favor, digite o seu e-mail.');
    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert('Sucesso', 'O link de recuperação foi enviado para o seu e-mail!');
        if (auth.currentUser) {
          navigation.navigate('Configuracoes');
        } else {
          navigation.goBack();
        }
      })
      .catch(() => {
        Alert.alert('Erro', 'Não foi possível enviar o link. Verifique o e-mail digitado.');
      });
  };

  const handleVoltar = () => {
    if (auth.currentUser) {
      navigation.getParent()?.navigate('Configuracoes');
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.containerAuth}>
      <ScrollView contentContainerStyle={styles.scrollContentAuth}>
        <View style={styles.cardAuth}>
          <TouchableOpacity onPress={handleVoltar} style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#1E3A8A" />
          </TouchableOpacity>
          <View style={styles.iconContainerAuth}>
            <View style={[styles.iconCircleAuth, { backgroundColor: '#F59E0B' }]}>
              <MaterialCommunityIcons name="lock-reset" size={50} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.tituloAuth}>Recuperar Senha</Text>
          <Text style={styles.subtituloAuth}>Enviaremos um link para o seu e-mail para criar uma nova senha.</Text>
          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>E-mail de Cadastro</Text>
            <View style={styles.inputContainerAuth}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#9CA3AF" style={styles.inputIconAuth} />
              <TextInput
                style={styles.inputAuth}
                placeholder="exemplo@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>
          </View>
          <TouchableOpacity style={[styles.botaoEntrarAuth, { backgroundColor: '#F59E0B' }]} onPress={handleRecuperar}>
            <Text style={styles.botaoEntrarTextAuth}>Enviar Link</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
