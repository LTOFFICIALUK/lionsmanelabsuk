/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_ROYAL_MAIL_API_KEY: string
  readonly VITE_ROYAL_MAIL_SENDER_NAME: string
  readonly VITE_ROYAL_MAIL_SENDER_COMPANY: string
  readonly VITE_ROYAL_MAIL_SENDER_EMAIL: string
  readonly VITE_ROYAL_MAIL_SENDER_PHONE: string
  readonly VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE1: string
  readonly VITE_ROYAL_MAIL_SENDER_ADDRESS_LINE2: string
  readonly VITE_ROYAL_MAIL_SENDER_CITY: string
  readonly VITE_ROYAL_MAIL_SENDER_COUNTY: string
  readonly VITE_ROYAL_MAIL_SENDER_POSTCODE: string
  readonly VITE_ROYAL_MAIL_NOTIFICATION_EMAILS: string
  readonly VITE_BREVO_API_KEY: string
  readonly VITE_BREVO_DEFAULT_LIST_ID: string
  readonly VITE_PIXXLES_MERCHANT_ID: string
  readonly VITE_PIXXLES_SIGNATURE_KEY: string
  readonly VITE_PIXXLES_GATEWAY_URL: string
  readonly VITE_PIXXLES_ENVIRONMENT: 'sandbox' | 'production'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
} 