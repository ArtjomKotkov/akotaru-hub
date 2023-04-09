export interface GlobalSettingsState {
    settings?: GlobalSettings;
}

export interface GlobalSettings {
    readonly refreshTokenCookieName: string;
    readonly authTokenCookieName: string;
    readonly authTokenExpiresIn: number;
    readonly refreshTokenExpiresIn: number;
}
