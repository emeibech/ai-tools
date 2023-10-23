import type { ReactNode } from 'react';
import type { Tool } from './features';

// Generic Tool form prop containing only route
export interface RouteProp {
  route: Tool;
}

// InfoCluster
export interface InfoClusterProps {
  className?: string;
  ariaLabel?: string;
  role?: string;
  children?: ReactNode;
}

// StoryGeneratorForm
export interface FormatStoryGeneratorPrompt {
  subject: string;
  style?: string;
  context?: string;
}

// ToneChangerForm
export interface FormatToneChangerPrompt {
  tone: string;
  message: string;
}
