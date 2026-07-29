export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  name: string,
  email: string            
}

export interface MeResponse {
    status: 'success';
    user: User;
}

export interface LoginResponse {
  status: 'success';
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  status: 'success';
  resource: unknown;
}

export interface AuthErrorResponse {
  status: 'error';
  message: string;
}
