export type RegisterState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    email?: string;
};
