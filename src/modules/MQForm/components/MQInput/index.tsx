import { forwardRef } from 'react';

import { Form } from 'react-bootstrap';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';
import classNames from 'classnames';

import { MQFormControlProps } from '../../types';

import './style.scss';

const MQInput: BsPrefixRefForwardingComponent<'input', MQFormControlProps> = forwardRef(
  ({ className = '', stroke = false, ...props }, ref) => (
    <Form.Control
      data-testid={`mq-input-${props.name}`}
      ref={ref}
      className={classNames(['mq-input', { stroke }, className])}
      {...props}
    />
  ),
);

MQInput.displayName = 'MQInput';

export default MQInput;
