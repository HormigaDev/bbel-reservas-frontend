'use client';

class User {
    public name: string;
    public type: 'customer' | 'admin';
    constructor(name: string, type: 'customer' | 'admin') {
        this.name = name;
        this.type = type;
    }

    public getInitial() {
        return this.name[0].toUpperCase() ?? '';
    }
}

class SessionService {
    private static tokenKey = 'AUTH_TOKEN';
    private static userDataKey = 'USER_DATA';

    public static saveToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    public static getToken(): string {
        const token = localStorage.getItem(this.tokenKey) ?? '';
        return token;
    }

    public static isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;
        return true;
    }

    public static getUser() {
        const userData: { name: string; type: 'customer' | 'admin' } | null =
            JSON.parse(localStorage.getItem(this.userDataKey) ?? '{}');

        const user = new User(
            userData?.name ?? '',
            userData?.type ?? 'customer'
        );

        return user;
    }

    public static saveUser(
        user: {
            name: string;
            email: string;
            phone: string;
            type: 'customer' | 'admin';
        } | null
    ) {
        if (!user) {
            return;
        }
        localStorage.setItem(
            this.userDataKey,
            JSON.stringify({ name: user.name, type: user.type })
        );
    }

    public static logout() {
        localStorage.removeItem(this.tokenKey);
        localStorage.removeItem(this.userDataKey);
    }
}

export default SessionService;
