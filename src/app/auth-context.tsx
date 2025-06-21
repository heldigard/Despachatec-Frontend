'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  notify: (msg: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get('/api/auth/me');
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/auth/login', { email, password });
      const { data } = await axios.get('/api/auth/me');
      setUser(data);
      setNotification('Inicio de sesión exitoso');
    } catch {
      setError('Credenciales inválidas');
      setNotification('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      setNotification('Sesión cerrada');
    } catch {
      setError('Error al cerrar sesión');
      setNotification('Error al cerrar sesión');
    } finally {
      setLoading(false);
    }
  };

  const notify = (msg: string) => setNotification(msg);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      notify,
    }),
    [user, loading],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow">
          {notification}
          <button className="ml-2" onClick={() => setNotification(null)}>
            &times;
          </button>
        </div>
      )}
      {error && (
        <div className="fixed bottom-16 right-4 bg-red-600 text-white px-4 py-2 rounded shadow">
          {error}
          <button className="ml-2" onClick={() => setError(null)}>
            &times;
          </button>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
