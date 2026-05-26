import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeChurchInfo, updateChurchField, updateChurchList } from '../services/churchService';

const ChurchContext = createContext();

export function ChurchProvider({ children }) {
  const [infoBanco, setInfoBanco] = useState({
    oracao: '"Senhor, fazei de mim um instrumento da vossa paz..."',
    listaMissas: [],
    listaConfissoes: [],
    listaDoacoes: [],
  });

  useEffect(() => {
    const unsub = subscribeChurchInfo(setInfoBanco);
    return unsub;
  }, []);

  const salvarEdicao = async (campo, valor) => {
    await updateChurchField(campo, valor);
  };

  const atualizarListas = async (campo, novaLista) => {
    await updateChurchList(campo, novaLista);
  };

  return (
    <ChurchContext.Provider value={{ infoBanco, salvarEdicao, atualizarListas }}>
      {children}
    </ChurchContext.Provider>
  );
}

export function useChurch() {
  return useContext(ChurchContext);
}
