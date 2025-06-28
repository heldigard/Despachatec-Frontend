'use client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('auth-token');
        const userData = localStorage.getItem('user-data');

        if (token && userData) {
          const user = JSON.parse(userData);
          setUser(user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-data');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.post('/api/auth/login', { usernameOrEmail: email, password });

        // Extraer token y datos de usuario de la respuesta de la API
        const token = data.accessToken;

        // Extraer rol desde el array de roles del backend
        // El backend devuelve roles como ["ROLE_ADMIN", "ADMIN"] o ["ROLE_USER", "USER"]
        let userRole: 'ADMIN' | 'USER' = 'USER'; // Por defecto USER
        if (data.roles && Array.isArray(data.roles) && data.roles.length > 0) {
          // Buscar si alguno de los roles indica que es ADMIN
          const hasAdminRole = data.roles.some((role: string | { nombre: string }) => {
            if (typeof role === 'string') {
              // Verificar tanto "ADMIN" como "ROLE_ADMIN"
              return role === 'ADMIN' || role === 'ROLE_ADMIN';
            }
            // Si es objeto con propiedad nombre
            else if (role && typeof role === 'object' && role.nombre) {
              return role.nombre === 'ADMIN' || role.nombre === 'ROLE_ADMIN';
            }
            return false;
          });

          userRole = hasAdminRole ? 'ADMIN' : 'USER';
        }

        const userData: User = {
          id: data.id.toString(),
          name: data.nombre ?? data.username ?? '',
          email: email, // Usar el email del login
          role: userRole,
        };

        // Guardar token y datos en localStorage
        localStorage.setItem('auth-token', token);
        localStorage.setItem('user-data', JSON.stringify(userData));

        // Actualizar estado
        setUser(userData);
        setNotification('Inicio de sesión exitoso');

        // Redirigir al dashboard
        router.push('/dashboard');
      } catch {
        setError('Credenciales inválidas');
        setNotification('Error al iniciar sesión');
      } finally {
        setLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Limpiar datos locales
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-data');
      setUser(null);
      setNotification('Sesión cerrada');
      router.push('/login');
    } catch {
      setError('Error al cerrar sesión');
      setNotification('Error al cerrar sesión');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const notify = (msg: string) => setNotification(msg);

  const contextValue = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      notify,
    }),
    [user, loading, login, logout],
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
