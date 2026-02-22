import api from './api'

export interface User {
  id: string
  name: string
  email: string
  created_at: string
}

export interface LoginResponse {
  message: string
  token: string
  user: User
}

export interface RegisterResponse {
  message: string
  user: User
}

export const login = async (email: string, password: string) => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
  })
  return response.data
}

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await api.post<RegisterResponse>('/auth/register', {
    name,
    email,
    password,
  })
  return response.data
}
