import { ReactNode } from 'react';

import { OverlayTriggerProps } from 'react-bootstrap/OverlayTrigger';

export interface MQTooltipProps extends Omit<OverlayTriggerProps, 'overlay'> {
  className?: string;
  overlay: ReactNode;
  active?: boolean;
}

export interface MQPopoverProps extends Omit<OverlayTriggerProps, 'overlay'> {
  className?: string;
  overlay: ReactNode;
  active?: boolean;
}
