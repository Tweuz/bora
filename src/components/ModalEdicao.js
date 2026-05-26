import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { styles } from '../styles/common';

export default function ModalEdicao({ visivel, fechar, titulo, valorAtual, onSalvar }) {
  const [texto, setTexto] = useState(valorAtual);

  useEffect(() => {
    setTexto(valorAtual);
  }, [valorAtual, visivel]);

  return (
    <Modal visible={visivel} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.modalTitulo}>Editar {titulo}</Text>
          <TextInput
            style={styles.modalInput}
            value={texto}
            onChangeText={setTexto}
            multiline
          />
          <View style={styles.modalBotoes}>
            <TouchableOpacity style={styles.modalBtnCancelar} onPress={fechar}>
              <Text style={styles.modalBtnTextCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBtnSalvar} onPress={() => onSalvar(texto)}>
              <Text style={styles.modalBtnTextSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
