// DTO para hacer un registro
export type RegisterDTO = {
  username: string;
  password: string;
  email: string;
};

// DTO para hacer un login
export type LoginDTO = {
  username: string;
  password: string;
  rememberMe: boolean;
};

// Respuesta del Login
export type UserLogin = {
  id: number;
  username: string;
  token: string;
};

export type User = {
  id: number;
  username: string;
};
