import axios from 'axios';

export async function loginService(email: string, password: string) {
  // Enviar usernameOrEmail según API
  const response = await axios.post('/api/auth/login', { usernameOrEmail: email, password });
  return response.data;
}

export async function logoutService() {
  // TODO: Replace with real API endpoint
  const response = await axios.post('/api/auth/logout');
  return response.data;
}

export async function fetchUserService() {
  // TODO: Replace with real API endpoint
  const response = await axios.get('/api/auth/me');
  return response.data;
}
