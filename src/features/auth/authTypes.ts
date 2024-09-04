export interface User {
    id: string,
    email: string,
    password: string
}

export interface AuthState {
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