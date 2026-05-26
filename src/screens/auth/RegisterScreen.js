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
  Switch,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { styles } from '../../styles/common';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [pastoralEscolhida, setPastoralEscolhida] = useState('');
  const [diaDisponivel, setDiaDisponivel] = useState('');
  const [anosParoquia, setAnosParoquia] = useState(0);
  const [distanciaCasa, setDistanciaCasa] = useState(0);
  const [receberAvisos, setReceberAvisos] = useState(false);
  const [voluntario, setVoluntario] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCadastrar = async () => {
    if (senha !== confirmaSenha) return Alert.alert('Erro', 'As senhas não batem!');
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), senha);
      const role = email.toLowerCase().includes('admin') ? 'Admin' : 'Fiel';
      await setDoc(doc(db, 'usuarios', userCredential.user.uid), {
        nome,
        email: email.toLowerCase(),
        tipo: role,
        pastoralEscolhida,
        diaDisponivel,
        anosParoquia,
        distanciaCasa,
        receberAvisos,
        voluntario,
        favoritos: [],
        temaDark: false,
      });
      Alert.alert('Sucesso', 'Conta criada! Faça login.');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Erro ao cadastrar. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleLimpar = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmaSenha('');
    setPastoralEscolhida('');
    setDiaDisponivel('');
    setAnosParoquia(0);
    setDistanciaCasa(0);
    setReceberAvisos(false);
    setVoluntario(false);
    Alert.alert('Formulário limpo', 'Todos os campos foram resetados.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerAuth}
    >
      <ScrollView contentContainerStyle={styles.scrollContentAuth}>
        <View style={styles.cardAuth}>
          <Text style={styles.tituloAuth}>Cadastro</Text>

          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>Nome Completo</Text>
            <View style={styles.inputContainerAuth}>
              <TextInput style={styles.inputAuth} value={nome} onChangeText={setNome} placeholder="Seu nome completo" />
            </View>
          </View>
          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>E-mail</Text>
            <View style={styles.inputContainerAuth}>
              <TextInput style={styles.inputAuth} value={email} onChangeText={setEmail} autoCapitalize="none" placeholder="seu@email.com" />
            </View>
          </View>
          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>Senha</Text>
            <View style={styles.inputContainerAuth}>
              <TextInput style={styles.inputAuth} value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha} placeholder="Mínimo 6 caracteres" />
              <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={styles.eyeIconAuth}>
                <MaterialCommunityIcons name={mostrarSenha ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>Confirmar Senha</Text>
            <View style={styles.inputContainerAuth}>
              <TextInput style={styles.inputAuth} value={confirmaSenha} onChangeText={setConfirmaSenha} secureTextEntry={!mostrarSenha} placeholder="Repita sua senha" />
            </View>
          </View>

          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>Pastoral que participa</Text>
            <View style={{ borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 14, backgroundColor: '#F9FAFB', overflow: 'hidden' }}>
              <Picker selectedValue={pastoralEscolhida} onValueChange={setPastoralEscolhida}>
                <Picker.Item label="Selecione uma pastoral..." value="" />
                <Picker.Item label="Pastoral da Criança" value="crianca" />
                <Picker.Item label="Pastoral da Saúde" value="saude" />
                <Picker.Item label="Pastoral da Família" value="familia" />
                <Picker.Item label="Pastoral da Juventude" value="juventude" />
                <Picker.Item label="Pastoral Carcerária" value="carceraria" />
                <Picker.Item label="Pastoral da Comunicação" value="comunicacao" />
                <Picker.Item label="Nenhuma" value="nenhuma" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>Dia disponível para reuniões</Text>
            <View style={{ borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 14, backgroundColor: '#F9FAFB', overflow: 'hidden' }}>
              <Picker selectedValue={diaDisponivel} onValueChange={setDiaDisponivel}>
                <Picker.Item label="Selecione um dia..." value="" />
                <Picker.Item label="Segunda-feira" value="segunda" />
                <Picker.Item label="Terça-feira" value="terca" />
                <Picker.Item label="Quarta-feira" value="quarta" />
                <Picker.Item label="Quinta-feira" value="quinta" />
                <Picker.Item label="Sexta-feira" value="sexta" />
                <Picker.Item label="Sábado" value="sabado" />
                <Picker.Item label="Domingo" value="domingo" />
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>
              Há quantos anos frequenta a paróquia:{' '}
              <Text style={{ color: '#1E3A8A', fontWeight: 'bold' }}>{Math.round(anosParoquia)} ano(s)</Text>
            </Text>
            <Slider minimumValue={0} maximumValue={50} step={1} value={anosParoquia} onValueChange={setAnosParoquia} minimumTrackTintColor="#1E3A8A" thumbTintColor="#1E3A8A" />
          </View>

          <View style={styles.inputGroupAuth}>
            <Text style={styles.labelAuth}>
              Distância de casa até a paróquia:{' '}
              <Text style={{ color: '#1E3A8A', fontWeight: 'bold' }}>{Math.round(distanciaCasa)} km</Text>
            </Text>
            <Slider minimumValue={0} maximumValue={100} step={1} value={distanciaCasa} onValueChange={setDistanciaCasa} minimumTrackTintColor="#1E3A8A" thumbTintColor="#1E3A8A" />
          </View>

          <View style={[styles.inputGroupAuth, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.labelAuth}>Receber avisos da paróquia?</Text>
            <Switch value={receberAvisos} onValueChange={setReceberAvisos} thumbColor={receberAvisos ? '#1E3A8A' : '#FFF'} />
          </View>
          <View style={[styles.inputGroupAuth, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={styles.labelAuth}>Deseja ser voluntário?</Text>
            <Switch value={voluntario} onValueChange={setVoluntario} thumbColor={voluntario ? '#1E3A8A' : '#FFF'} />
          </View>

          <TouchableOpacity
            style={[styles.botaoEntrarAuth, { backgroundColor: '#1E3A8A', marginBottom: 12, opacity: loading ? 0.7 : 1 }]}
            onPress={handleCadastrar}
            disabled={loading}
          >
            <Text style={styles.botaoEntrarTextAuth}>{loading ? 'Cadastrando...' : 'Criar Minha Conta'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botaoEntrarAuth, { backgroundColor: '#F1F5F9', borderWidth: 1.5, borderColor: '#CBD5E1' }]} onPress={handleLimpar}>
            <Text style={[styles.botaoEntrarTextAuth, { color: '#64748B' }]}>Limpar Formulário</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
            <Text style={[styles.cadastroLinkAuth, { textAlign: 'center', color: '#1E3A8A' }]}>Já tenho conta / Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
