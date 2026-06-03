export interface AdminUser {
  id: number;
  email: string;
  role: 'ADMIN'; 
}

export interface LoginResponse {
  token: string;
  user: AdminUser;
}