declare module 'sib-api-v3-sdk' {
    export interface SendSmtpEmail {
        sender: {
            email: string;
            name?: string;
        };
        to: Array<{
            email: string;
            name?: string;
        }>;
        subject: string;
        htmlContent: string;
    }

    export class TransactionalEmailsApi {
        sendTransacEmail(sendSmtpEmail: SendSmtpEmail): Promise<any>;
    }

    export class ApiClient {
        static instance: {
            authentications: {
                'api-key': {
                    apiKey: string;
                };
            };
        };
    }
} 