"use client";

import { useState, useEffect, useCallback } from 'react';

function usePersistentState<T>(key: string, initialState: T): [T, (value: T | ((val: T) => T)) => void] {
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

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    setState((prevState) => {
      const valueToStore = value instanceof Function ? value(prevState) : value;
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error("Error writing to localStorage", error);
      }
      return valueToStore;
    });
  }, [key]);

  useEffect(() => {
    // This effect ensures that the state is updated if localStorage changes in another tab.
    // And also initializes state on client if it wasn't done in useState (e.g. if window was undefined)
    const handleStorageChange = () => {
      try {
        const storedValue = window.localStorage.getItem(key);
        if (storedValue) {
          setState(JSON.parse(storedValue));
        } else {
          setState(initialState);
        }
      } catch (error) {
        console.error("Error handling storage change", error);
      }
    };
    
    if (typeof window !== 'undefined') {
        // Initial sync if state wasn't set correctly from localStorage in useState
        const storedValue = window.localStorage.getItem(key);
        const currentInitialState = storedValue ? JSON.parse(storedValue) : initialState;
        if (JSON.stringify(state) !== JSON.stringify(currentInitialState)) {
             setState(currentInitialState);
        }
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [key, initialState, state]);


  return [state, setValue];
}

export default usePersistentState;
