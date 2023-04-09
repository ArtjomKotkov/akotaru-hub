export interface CurrentUser {
    id: number;
    username: string;
    firstName: string;
    lastName?: string;
    photoUrl?: string;
    role?: string;
}

export interface CurrentUserState {
    user?: CurrentUser
}
