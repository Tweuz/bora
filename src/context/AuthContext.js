import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { getUserProfile } from '../services/userService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const dados = await getUserProfile(firebaseUser.uid);
        setUser(firebaseUser);
        setPerfil(dados);
      } else {
        setUser(null);
        setPerfil(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = (firebaseUser, dados) => {
    setUser(firebaseUser);
    setPerfil(dados);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setPerfil(null);
  };

  const updatePerfil = (novosDados) => {
    setPerfil((prev) => ({ ...prev, ...novosDados }));
  };

  return (
    <AuthContext.Provider
      value={{ user, perfil, loading, login, logout, updatePerfil, setPerfil }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
