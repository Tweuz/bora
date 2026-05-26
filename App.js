import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ChurchProvider } from './src/context/ChurchContext';
import RootNavigator from './src/navigation/RootNavigator';

function ThemeSync() {
  const { perfil } = useAuth();
  const { setTemaDark, temaDark } = useTheme();

  useEffect(() => {
    if (perfil?.temaDark !== undefined && perfil.temaDark !== temaDark) {
      setTemaDark(perfil.temaDark);
    }
  }, [perfil?.temaDark]);

  return null;
}

function AppProviders({ children }) {
  const { user } = useAuth();
  return (
    <ThemeProvider userId={user?.uid}>
      <ChurchProvider>
        <ThemeSync />
        {children}
      </ChurchProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProviders>
        <RootNavigator />
      </AppProviders>
    </AuthProvider>
  );
}
