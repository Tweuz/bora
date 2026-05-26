import { useState, useEffect, useCallback } from 'react';

/**
 * Hook customizado para consumir APIs públicas.
 * @param {string} url - URL completa do endpoint
 * @param {object} options - { enabled: boolean, deps: array }
 */
export function useFetchData(url, options = {}) {
  const { enabled = true, deps = [] } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, url, fetchData, ...deps]);

  return { data, loading, error, refetch: fetchData };
}
