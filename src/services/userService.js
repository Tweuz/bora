import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export async function getUserProfile(uid) {
  const docSnap = await getDoc(doc(db, 'usuarios', uid));
  return docSnap.exists() ? docSnap.data() : null;
}

export async function saveUserProfile(uid, data) {
  await setDoc(doc(db, 'usuarios', uid), data, { merge: true });
}

export async function updateUserProfile(uid, partialData) {
  await updateDoc(doc(db, 'usuarios', uid), partialData);
}

export async function toggleFavorite(uid, postId) {
  const profile = await getUserProfile(uid);
  const favoritos = profile?.favoritos || [];
  const exists = favoritos.includes(postId);
  const novosFavoritos = exists
    ? favoritos.filter((id) => id !== postId)
    : [...favoritos, postId];
  await saveUserProfile(uid, { favoritos: novosFavoritos });
  return novosFavoritos;
}

export async function saveThemePreference(uid, temaDark) {
  await saveUserProfile(uid, { temaDark });
}
