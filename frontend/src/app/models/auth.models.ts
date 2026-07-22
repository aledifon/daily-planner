export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: 'success';
  token: string;
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
