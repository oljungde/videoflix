export interface LoginResponse {
    access: string;
    refresh: string;
    user: User;
}

export interface User {}
