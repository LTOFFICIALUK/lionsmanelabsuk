export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

export interface FAQComponentProps {
  title?: string;
  faqs: FAQItem[];
  className?: string;
  titleSize?: 'small' | 'medium' | 'large';
  showLastUpdated?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
}

export type FAQTitleSize = 'small' | 'medium' | 'large';
export type FAQMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl'; 