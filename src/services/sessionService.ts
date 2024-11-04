class SessionService {
    private static tokenKey = "authToken";

    public static saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    public static getToken(): string {
        const token = localStorage.getItem(this.tokenKey) ?? "";
        return token;
    }

    public static isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;
        return true;
    }
}

export default SessionService;
