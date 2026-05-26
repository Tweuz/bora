import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export function subscribeChurchInfo(callback) {
  return onSnapshot(doc(db, 'igreja', 'informacoes'), (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        oracao: data.oracao || '"Senhor, fazei de mim um instrumento da vossa paz..."',
        listaMissas: data.listaMissas || [],
        listaConfissoes: data.listaConfissoes || [],
        listaDoacoes: data.listaDoacoes || [],
      });
    } else {
      callback({
        oracao: '"Senhor, fazei de mim um instrumento da vossa paz..."',
        listaMissas: [],
        listaConfissoes: [],
        listaDoacoes: [],
      });
    }
  });
}

export async function updateChurchField(campo, valor) {
  await setDoc(doc(db, 'igreja', 'informacoes'), { [campo]: valor }, { merge: true });
}

export async function updateChurchList(campo, novaLista) {
  await setDoc(doc(db, 'igreja', 'informacoes'), { [campo]: novaLista }, { merge: true });
}
