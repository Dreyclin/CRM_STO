export interface User {
    id: string,
    email: string,
    password: string,
    isActive: Boolean
}

export interface AuthState {
    token: string | null,
    user: User | null,
    status: "idle" | "failed" | "loading" | "succeded",
    error: string | null
}

export interface LoginCredentials {
    email: string,
    password: string
}

export interface RegistrationCredentials {
    email: string,
    password: string,
    confirmPassword: string
}

export interface RegisterResponse {
    user: User
}

export interface LoginResponse {
    token: string,
    user: User
}