import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveThemePreference } from '../services/userService';

const ThemeContext = createContext();

export function ThemeProvider({ children, userId }) {
  const [temaDark, setTemaDark] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('@tema_dark').then((value) => {
      if (value === 'true') setTemaDark(true);
    });
  }, []);

  const toggleTema = async (value) => {
    setTemaDark(value);
    await AsyncStorage.setItem('@tema_dark', value ? 'true' : 'false');
    if (userId) {
      try {
        await saveThemePreference(userId, value);
      } catch (_) {
        /* persistência local já aplicada */
      }
    }
  };

  const colors = {
    background: temaDark ? '#0F172A' : '#F8FAFC',
    card: temaDark ? '#1E293B' : '#FFFFFF',
    text: temaDark ? '#F1F5F9' : '#1E293B',
    subtext: temaDark ? '#94A3B8' : '#64748B',
    border: temaDark ? '#334155' : '#E2E8F0',
    primary: '#1E3A8A',
  };

  return (
    <ThemeContext.Provider value={{ temaDark, setTemaDark: toggleTema, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
