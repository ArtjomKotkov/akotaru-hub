export interface GetUserResponse {
    entity: {
        id: number;
        username: string;
        first_name: string;
        last_name?: string;
        photo_url?: string;
        role?: string;
    }
}
