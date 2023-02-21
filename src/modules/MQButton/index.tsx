import { forwardRef } from 'react';

import { Button } from 'react-bootstrap';
import classNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import MQSpinner from 'modules/MQSpinner';

import { MQButtonProps } from './types';

import './style.scss';

export const MQButton: BsPrefixRefForwardingComponent<'button', MQButtonProps> = forwardRef(
  ({ children, className, isLoading, variant = 'primary', disabled, full = false, nowrap = true, circle, ...props }, ref) => (
    <Button
      variant={variant}
      ref={ref}
      className={classNames('mq-btn', className, { full }, { nowrap }, { circle })}
      disabled={isLoading || disabled}
      style={{ minWidth: circle?.size, minHeight: circle?.size }}
      {...props}
    >
      {children}
      {isLoading && (
        <MQSpinner
          data-testid="mq-btn-loading"
          className="mq-btn__spinner"
          animation="grow"
          as="span"
          size="sm"
          centered
        />
      )}
    </Button>
  ),
);

MQButton.displayName = 'MQButton';

export default MQButton;
