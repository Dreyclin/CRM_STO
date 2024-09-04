export interface EmailVerificationState {
    status: "idle" | "failed" | "loading" | "succeded",
    error: string | null
}