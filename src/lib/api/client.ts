import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for JWT (client-side only)
if (typeof window !== 'undefined') {
  apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 🔍 DEBUGGING: Log all API calls
    console.log(`🌐 API Call: ${config.method?.toUpperCase()} ${config.url}`, {
      timestamp: new Date().toISOString(),
      data: config.data,
      params: config.params,
    });

    return config;
  });
}

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    // 🔍 DEBUGGING: Log successful responses
    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`,
      {
        timestamp: new Date().toISOString(),
        status: response.status,
        data: response.data,
      },
    );
    return response;
  },
  (error) => {
    // 🔍 DEBUGGING: Log failed responses
    console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      timestamp: new Date().toISOString(),
      status: error.response?.status,
      message: error.response?.data,
    });

    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Clear auth data and redirect to login
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-data');
      window.location.href = '/login';
    }
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  },
);

export default apiClient;
