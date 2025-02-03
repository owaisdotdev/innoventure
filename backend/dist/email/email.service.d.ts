export declare class EmailService {
    private transporter;
    sendResetPasswordEmail(email: string, resetCode: string): Promise<void>;
}
