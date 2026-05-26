import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import DetailsScreen from '../screens/DetailsScreen';
import HomeScreen from '../screens/HomeScreen';
import MissasScreen from '../screens/MissasScreen';
import ConfissoesScreen from '../screens/ConfissoesScreen';
import CampanhasScreen from '../screens/CampanhasScreen';
import PastoraisScreen from '../screens/PastoraisScreen';
import ContatoScreen from '../screens/ContatoScreen';
import RecoverPasswordScreen from '../screens/auth/RecoverPasswordScreen';

const Stack = createNativeStackNavigator();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeParoquia">
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Detalhes" component={DetailsScreen} />
      <Stack.Screen name="HomeParoquia" component={HomeScreen} />
      <Stack.Screen name="Missas" component={MissasScreen} />
      <Stack.Screen name="Confissoes" component={ConfissoesScreen} />
      <Stack.Screen name="Campanhas" component={CampanhasScreen} />
      <Stack.Screen name="Pastorais" component={PastoraisScreen} />
      <Stack.Screen name="Contato" component={ContatoScreen} />
      <Stack.Screen name="Recuperar" component={RecoverPasswordScreen} />
    </Stack.Navigator>
  );
}
