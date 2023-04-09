export interface TelegramLoginData {
    id: number,
    first_name: string;
    last_name?: string;
    user_name: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

export interface AuthTokenPayload {
    id: number;
    role: string;
    expiresIn: number;
}

export interface AuthTokenPayloadState {
    payload?: AuthTokenPayload | null;
}
