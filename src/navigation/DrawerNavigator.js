import React from 'react';
import { View, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MainStackNavigator from './MainStackNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { logout, perfil } = useAuth();

  const handleSair = () => {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          props.navigation.closeDrawer();
          logout();
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ padding: 20, backgroundColor: '#1E3A8A', marginBottom: 10 }}>
        <MaterialCommunityIcons name="church" size={40} color="#FFF" />
        <DrawerItem
          label={perfil?.nome || 'Usuário'}
          labelStyle={{ color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: -16 }}
          icon={() => null}
          onPress={() => {}}
        />
      </View>

      <DrawerItem
        label="Início"
        icon={({ color, size }) => <MaterialCommunityIcons name="home-outline" color={color} size={size} />}
        onPress={() => props.navigation.navigate('InicioStack', { screen: 'HomeParoquia' })}
      />
      <DrawerItem
        label="Liturgia da Semana"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="book-cross" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate('InicioStack', { screen: 'Dashboard' })}
      />
      <DrawerItem
        label="Perfil"
        icon={({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} />}
        onPress={() => props.navigation.navigate('Perfil')}
      />
      <DrawerItem
        label="Configurações"
        icon={({ color, size }) => <MaterialCommunityIcons name="cog-outline" color={color} size={size} />}
        onPress={() => props.navigation.navigate('Configuracoes')}
      />
      <DrawerItem
        label="Sair"
        icon={({ color, size }) => <MaterialCommunityIcons name="logout" color="#EF4444" size={size} />}
        labelStyle={{ color: '#EF4444', fontWeight: 'bold' }}
        onPress={handleSair}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#1E3A8A',
        drawerInactiveTintColor: '#64748B',
      }}
    >
      <Drawer.Screen
        name="InicioStack"
        component={MainStackNavigator}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="Configuracoes"
        component={SettingsScreen}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
    </Drawer.Navigator>
  );
}
