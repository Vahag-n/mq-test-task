import { FC } from 'react';

import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { MQTooltipProps } from './types';
import MQPopover from './components/MQPopover';

import './style.scss';

const MQTooltip: FC<MQTooltipProps> & {
  Popover: typeof MQPopover;
} = ({
  active = true,
  overlay,
  children,
  className = '',
  placement = 'auto',
  trigger = ['hover', 'focus'],
  ...props
}) => {
  if (active) {
    return (
      <OverlayTrigger
        placement={placement}
        trigger={trigger}
        overlay={
          <Tooltip
            data-testid="mq-tooltip"
            id={`mq-tooltip--${placement}`}
            className={classNames(['mq-tooltip', className])}
          >
            {overlay}
          </Tooltip>
        }
        {...props}
      >
        {children}
      </OverlayTrigger>
    );
  }

  return <>{children}</>;
};

MQTooltip.Popover = MQPopover;

export default MQTooltip;
