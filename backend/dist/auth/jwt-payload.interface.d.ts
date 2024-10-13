export interface JwtPayload {
    email: string;
    role: 'investor' | 'startup' | 'admin';
    sub: string;
}
