export declare class ResetPasswordDto {
    email: string;
    role: 'investor' | 'startup' | 'admin';
    resetCode: string;
    newPassword: string;
}
