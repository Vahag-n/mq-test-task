import { forwardRef } from 'react';

import { Form } from 'react-bootstrap';
import classNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQSelectProps } from '../../types';

import './style.scss';

const MQSelect: BsPrefixRefForwardingComponent<'input', MQSelectProps> = forwardRef(
  ({ className = '', ...props }, ref) => (
    <Form.Control
      data-testid={`mq-select-${props.name}`}
      ref={ref}
      as="select"
      className={classNames(['mq-select', className])}
      {...props}
    />
  ),
);

MQSelect.displayName = 'MQSelect';

export default MQSelect;
