import type { ReactNode } from 'react';
import type { Name, Tool } from './features';
import type { Control, UseFormReturn } from 'react-hook-form';

// Generic Tool form prop containing only route
export interface ToolProp {
  route: Tool;
  name: Name;
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

// BirthDatePicker
export interface DatePickerParams {
  control:
    | Control<{
        [x: string]: string;
      }>
    | undefined;
  label: string;
  form: UseFormReturn;
}

export type SelectedMonth =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '';

// LoginForm

export type ReqStatus = 'idle' | 'requesting' | 'error' | 'success';

export interface PreviewState {
  url: string;
  name: string;
}

export interface ImageTranslatorProps extends ToolProp {
  setImg: React.Dispatch<
    React.SetStateAction<{
      src: string;
      alt: string;
    }>
  >;
}
