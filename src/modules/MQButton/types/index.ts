import { ButtonProps } from 'react-bootstrap';

export type MQButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'
  | 'link'
  | 'tertiary--danger'
  | 'sub-action'
  | 'sub-action--tertiary'
  | 'outline-primary'
  | 'outline-secondary'
  | 'outline-success'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-dark'
  | 'outline-light';

export interface MQButtonCircleProps {
  size: number;
}

export interface MQButtonProps extends ButtonProps {
  full?: boolean;
  className?: string;
  variant?: MQButtonVariant;
  isLoading?: boolean;
  nowrap?: boolean;
  circle?: MQButtonCircleProps;
}
