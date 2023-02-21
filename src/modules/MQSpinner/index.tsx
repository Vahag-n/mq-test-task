import { forwardRef } from 'react';

import { Spinner } from 'react-bootstrap';
import classNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQSpinnerProps } from './types';
import './style.scss';

export const MQSpinner: BsPrefixRefForwardingComponent<'div', MQSpinnerProps> = forwardRef(
  ({ className, centered, ...props }, ref) => (
    <div className={classNames(['mq-spinner', className, { centered }])}>
      <Spinner data-testid="mq-spinner" ref={ref} className="mq-spinner__loader" {...props} />
    </div>
  ),
);

MQSpinner.displayName = 'MQSpinner';

export default MQSpinner;
