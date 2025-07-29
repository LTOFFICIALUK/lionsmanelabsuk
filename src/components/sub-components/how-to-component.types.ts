export interface HowToStep {
  name: string;
  text: string | React.ReactNode;
  image?: string;
  video?: string;
  url?: string;
}

export interface HowToSupply {
  name: string;
  image?: string;
}

export interface HowToTool {
  name: string;
  image?: string;
}

export interface HowToComponentProps {
  title: string;
  description?: string;
  steps: HowToStep[];
  supplies?: HowToSupply[];
  tools?: HowToTool[];
  totalTime?: string; // ISO 8601 duration format (e.g., "PT30M" for 30 minutes)
  estimatedCost?: {
    currency: string;
    value: number;
  };
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  className?: string;
  showStepNumbers?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl';
}

export type HowToDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type HowToMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl'; 