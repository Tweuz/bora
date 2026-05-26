import { API_LITURGIA_URL } from '../constants';

/** Próximos 7 dias de liturgia (inclui hoje) — tema paroquial/católico */
export async function fetchLiturgiasDaSemana() {
  const response = await fetch(API_LITURGIA_URL);
  if (!response.ok) throw new Error('Não foi possível carregar a liturgia.');
  const json = await response.json();
  return Array.isArray(json) ? json : [json];
}

export function resumoEvangelho(liturgia) {
  const evangelho = liturgia?.leituras?.evangelho?.[0];
  if (!evangelho?.texto) return 'Leituras disponíveis nos detalhes.';
  const texto = evangelho.texto.replace(/\s+/g, ' ').trim();
  return texto.length > 120 ? `${texto.slice(0, 120)}...` : texto;
}
