import { forwardRef } from 'react';

import { Form } from 'react-bootstrap';
import classesNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQCheckProps } from '../../types';
import './style.scss';

const MQSwitch: BsPrefixRefForwardingComponent<'input', MQCheckProps> = forwardRef(
  ({ className = '', checked = false, ...props }, ref) => (
    <Form.Switch
      data-testid={`mq-switch-${props.name}-${props.id}`}
      ref={ref}
      checked={checked}
      className={classesNames(['mq-switch', className])}
      {...props}
    />
  ),
);

MQSwitch.displayName = 'MQSwitch';

export default MQSwitch;
