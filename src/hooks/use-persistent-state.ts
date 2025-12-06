"use client";

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para persistir estado en localStorage.
 * Sincroniza el estado entre pestañas y recargas.
 *
 * @param key Clave única para localStorage.
 * @param initialState Valor inicial por defecto.
 * @returns Tupla [estado, setEstado].
 */
function usePersistentState<T>(key: string, initialState: T): [T, (value: T | ((val: T) => T)) => void] {
  // Inicializar estado leyendo de localStorage si está disponible
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialState;
    }
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return initialState;
    }
  });

  // Wrapper para setState que también actualiza localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? (value as (val: T) => T)(state) : value;
      setState(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [key, state]);

  useEffect(() => {
    // Sincronizar cambios desde otras pestañas
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        try {
          setState(JSON.parse(event.newValue));
        } catch (error) {
          console.error("Error parsing storage change", error);
        }
      } else if (event.key === key && !event.newValue) {
          // Si se borra la clave, volver al estado inicial?
          // O mantener el último estado conocido? Por ahora mantenemos estado.
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key]);

  return [state, setValue];
}

export default usePersistentState;
