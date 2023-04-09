export interface GlobalSettingsGetResponse {
    entity: {
        refresh_token_cookie_name: string
        auth_token_cookie_name: string
        auth_token_expires_in: number
        refresh_token_expires_in: number
    }
}
