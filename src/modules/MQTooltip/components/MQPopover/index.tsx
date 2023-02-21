import { FC } from 'react';

import classNames from 'classnames';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { MQPopoverProps } from 'modules/MQTooltip/types';

const MQPopover: FC<MQPopoverProps> = ({
  active = true,
  children,
  className = '',
  placement = 'auto',
  trigger = ['click', 'focus'],
  overlay,
  ...props
}) => {
  if (active) {
    return (
      <OverlayTrigger
        delay={{
          show: 500,
          hide: 200,
        }}
        placement={placement}
        trigger={trigger}
        rootClose
        overlay={
          <Popover id={`mq-tooltip--${placement}`} className={classNames(['mq-tooltip', className])}>
            {overlay}
          </Popover>
        }
        {...props}
      >
        {children}
      </OverlayTrigger>
    );
  }

  return <>{children}</>;
};

export default MQPopover;
