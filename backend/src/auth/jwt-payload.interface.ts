export interface JwtPayload {
  email: string;
  role: 'investor' | 'startup';
  sub: string; // This is the investorId or startupId
}
