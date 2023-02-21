import { forwardRef } from 'react';

import Feedback from 'react-bootstrap/Feedback';
import classNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQFeedbackProps } from '../../types';
import './style.scss';

const MQFeedback: BsPrefixRefForwardingComponent<'div', MQFeedbackProps> = forwardRef(
  ({ className = '', touched = true, ...props }, ref) => (
    <Feedback
      ref={ref}
      data-testid="mq-form-feedback"
      className={classNames('mq-form__feedback', { 'mq-form__feedback--hidden': !touched }, className)}
      {...props}
    />
  ),
);

MQFeedback.displayName = 'MQFeedback';

export default MQFeedback;
