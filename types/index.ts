export type RegisterState = {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
    email?: string;
};

export type PageProps = {
    readonly params: { id: string };
};


export type Song = {
    id: number;
    title: string;
    artist: string;
    priority: string;
}
