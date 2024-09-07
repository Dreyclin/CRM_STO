export interface User {
    id: string,
    email: string,
}

export interface AuthState {
    token: String | null
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

export interface LoginResponse {
    token: string,
    user: User
}

export interface RegisterResponse {
    user: User,
    error: string | null
}