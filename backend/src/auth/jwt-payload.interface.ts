export interface JwtPayload {
  email: string;
  role: 'investor' | 'startup' | 'admin';
  sub: string; // This is the investorId or startupId
}
